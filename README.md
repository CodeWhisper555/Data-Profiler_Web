# 📊 Intelligent Data Profiler (Browser-Core)

This is the frontend component of a dual-tier data suite designed for **instant exploratory analysis**. While most tools require a slow server upload, this tool handles the heavy lifting directly in your browser.



## 🛠 Why I built this
Standard data profiling usually involves a lot of "wait time" while files upload to a server. I wanted to build a "speed-first" alternative that gives immediate visual feedback. 

## ⚡ The "Compute-Split" Logic
- **Browser Level:** Uses `PapaParse` and `Chart.js` for instant CSV processing. This keeps your data private (it never leaves your machine).
- **Engine Level:** For deep statistics (like correlation heatmaps), I built a secondary Python engine to handle the complex math that JavaScript isn't optimized for.

## 🚀 Key Features
- **Zero-Latency:** Multi-threaded CSV parsing.
- **Glassmorphism UI:** Modern, dark-mode ready interface.
- **Privacy Centric:** Client-side processing ensures data stays local.

## 🔗 Live Links
- **Web Dashboard:** https://codewhisper555.github.io/Data-Profiler_Web/
- **Python Engine:** https://data-profilerpython-jzexmafhrvueyhbacwvifg.streamlit.app/
