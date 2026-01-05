const form = document.getElementById("search-form");
const input = document.getElementById("query-input");
const resultsDiv = document.getElementById("results");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = input.value.trim();
  if (!query) return;

  // Reset UI
  resultsDiv.innerHTML = "";
  spinner.classList.remove("hidden");

  try {
    const res = await fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();
    spinner.classList.add("hidden");

    if (!data.results || data.results.length === 0) {
      resultsDiv.innerHTML =
        "<p style='text-align:center;opacity:0.7;'>No results found.</p>";
      scrollToResults(); // still scroll
      return;
    }

    data.results.forEach((problem, idx) => {
      const card = document.createElement("div");
      card.className = "card" + (idx === 0 ? " featured" : "");

      const logo =
        problem.platform === "LeetCode"
          ? "assets/logos/leetcode.png"
          : "assets/logos/codeforces.png";

      card.innerHTML = `
        <div class="card-header">
          <img class="platform-logo" src="${logo}" alt="${problem.platform}">
          <a class="card-title" href="${problem.url}" target="_blank" rel="noopener">
            [${problem.platform}] ${problem.title}
          </a>
        </div>
      `;

      resultsDiv.appendChild(card);
    });

    // ✅ SMOOTH SCROLL TO RESULTS (KEY FEATURE)
    scrollToResults();

  } catch (err) {
    spinner.classList.add("hidden");
    resultsDiv.innerHTML =
      "<p style='color:red;text-align:center;'>Something went wrong.</p>";
  }
});

/* ===========================
   🔽 SMOOTH SCROLL FUNCTION
   =========================== */
function scrollToResults() {
  const resultsContainer = document.querySelector(".results-container");

  if (!resultsContainer) return;

  resultsContainer.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
