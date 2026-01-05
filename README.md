# 🔍 DSA Search Engine

A fast, intelligent search engine to find **Data Structures & Algorithms (DSA) problems** across multiple competitive programming platforms — all in one place.

---

## 🚀 Overview

The **DSA Search Engine** is a specialized search platform that allows users to quickly discover relevant DSA problems without manually browsing sites like LeetCode or Codeforces.

Instead of keyword matching, this project uses **TF–IDF (Term Frequency–Inverse Document Frequency)** to rank problems based on **semantic relevance**, giving more meaningful results for interview preparation and practice.

---

## ✨ Key Features

- 🔎 Search **3500+ curated DSA problems**
- ⚡ Fast and accurate **TF–IDF–based ranking**
- 🌐 Aggregates problems from **LeetCode** and **Codeforces**
- 🧠 NLP-based preprocessing for better relevance
- 🎨 Modern, responsive UI with **Dark/Light mode**
- 📜 Smooth animated scroll to results
- 🔗 Direct links to original problem statements

---

## 🎯 Use Cases

- Interview preparation for software engineering roles  
- Topic-wise DSA practice (arrays, DP, graphs, etc.)  
- Competitive programming problem discovery  
- Academic coursework and self-learning  

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Search & NLP
- `natural` (TF–IDF implementation)
- `stopword`
- Custom text preprocessing

### Scraping
- Puppeteer (for building the problem corpus)

---

## 📸 Screenshots

### 🏠 Home Page (Dark Mode)
![Home Page](./assets/screenshots/home-dark.png)

### 🔍 Search in Action
![Search Results](./assets/screenshots/search-results.png)

### 📋 Ranked Results List
![Results List](./assets/screenshots/results-list.png)

> 📌 *Screenshots demonstrate dark mode UI, search experience, and ranked DSA results.*

---

## 🧠 How It Works

1. **Web Scraping**
   - Problems are scraped from platforms like LeetCode and Codeforces.
   - Relevant text data (titles, descriptions, metadata) is extracted.

2. **Preprocessing**
   - Text is cleaned, tokenized, and stopwords are removed.

3. **Indexing**
   - TF–IDF vectors are created for every problem.
   - Each document vector is normalized for cosine similarity.

4. **Query Processing**
   - User input is preprocessed similarly.
   - Cosine similarity is computed against all indexed problems.

5. **Ranking**
   - Results are ranked by relevance score.
   - Top matching problems are returned with direct links.

---

## 📁 Project Structure

```text
DSA-Search-Engine/
├── assets/            # Platform logos & static assets
│   └── screenshots/   # UI screenshots
├── corpus/            # Scraped problem data (JSON)
├── utils/             # Text preprocessing utilities
├── index.html         # Frontend HTML
├── styles.css         # Styling (Dark/Light mode)
├── script.js          # Frontend logic
├── index.js           # Backend server
├── package.json
└── README.md 
```

## ▶️ Getting Started

### Clone the repository
```bash
git clone https://github.com/harshtadas8/DSA-Search-Engine.git
```
### Install Dependencies
```bash
npm install
```
### Start the Server
```bash
node index.js
```
### Open in Browser
```bash
http://localhost:3000
```
---
Made with ❤️ for DSA practice and learning.
