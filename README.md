# Quick Data Profiler 📊

I built this because I got tired of opening heavy software just to check the basic stats of a CSV file. This is a lightweight, "zero-install" dashboard that handles the initial data check directly in your browser.

### Why use this?
* **Privacy:** Your data never leaves your computer. All processing happens in the browser via JS.
* **Speed:** No waiting for a Python kernel to start. Just drag, drop, and see the trends.
* **Dark Mode:** Because no one likes staring at a white screen at 2 AM.

### Under the hood
* **Parsing:** Using `PapaParse` because it handles large CSVs without crashing the tab.
* **Charts:** `Chart.js` for the visuals. It's set to show the first 30 rows by default to keep the UI snappy.

### How to run it locally
1. Clone the repo.
2. Open `index.html` in Chrome or Firefox. 
3. (Optional) If you want to see the advanced AI version, check my other repo: [Link to Python Repo]
