import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "natural";

import preprocess from "./utils/preprocess.js";

const { TfIdf } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// --- Fix __dirname for ES modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Middleware ---
app.use(express.json());

// Serve frontend files (index.html, styles.css, script.js, assets, etc.)
app.use(express.static(__dirname));

// --- Search Engine Data ---
let problems = [];
let tfidf = new TfIdf();

// store each document’s tf-idf vector and its magnitude
let docVectors = [];
let docMagnitudes = [];

async function loadProblemsAndBuildIndex() {
  const data = await fs.readFile(
    path.join(__dirname, "corpus/all_problems.json"),
    "utf-8"
  );

  problems = JSON.parse(data);
  tfidf = new TfIdf();

  // Add documents: title boosted by duplicating, plus description
  problems.forEach((problem, idx) => {
    const text = preprocess(
      `${problem.title} ${problem.title} ${problem.description || ""}`
    );
    tfidf.addDocument(text, idx.toString());
  });

  // Build document vectors and magnitudes for cosine similarity
  docVectors = [];
  docMagnitudes = [];

  problems.forEach((_, idx) => {
    const vector = {};
    let sumSquares = 0;

    tfidf.listTerms(idx).forEach(({ term, tfidf: weight }) => {
      vector[term] = weight;
      sumSquares += weight * weight;
    });

    docVectors[idx] = vector;
    docMagnitudes[idx] = Math.sqrt(sumSquares);
  });
}

// --- Search API ---
app.post("/search", (req, res) => {
  const rawQuery = req.body.query;

  if (!rawQuery || typeof rawQuery !== "string") {
    return res.status(400).json({ error: "Missing or invalid 'query'" });
  }

  const query = preprocess(rawQuery);
  const tokens = query.split(" ").filter(Boolean);

  const termFreq = {};
  tokens.forEach((t) => {
    termFreq[t] = (termFreq[t] || 0) + 1;
  });

  const queryVector = {};
  let sumSqQ = 0;
  const N = tokens.length;

  Object.entries(termFreq).forEach(([term, count]) => {
    const tf = count / N;
    const idf = tfidf.idf(term);
    const w = tf * idf;
    queryVector[term] = w;
    sumSqQ += w * w;
  });

  const queryMag = Math.sqrt(sumSqQ) || 1;

  const scores = problems.map((_, idx) => {
    const docVec = docVectors[idx];
    const docMag = docMagnitudes[idx] || 1;
    let dot = 0;

    for (const [term, wq] of Object.entries(queryVector)) {
      if (docVec[term]) {
        dot += wq * docVec[term];
      }
    }

    return { idx, score: dot / (queryMag * docMag) };
  });

  const top = scores
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ idx }) => {
      const p = problems[idx];
      const platform = p.url.includes("leetcode.com")
        ? "LeetCode"
        : "Codeforces";
      return { ...p, platform };
    });

  res.json({ results: top });
});

// --- Start Server ---
loadProblemsAndBuildIndex().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
