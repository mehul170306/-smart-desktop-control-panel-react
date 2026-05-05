# 🛠 Smart Desktop Control Panel - Helper Guide

This guide contains the essential procedures for running, developing, and deploying your project.

## 🚀 1. Running the Project Locally (Dual-Terminal Setup)

To see real-time PC stats and control your apps, you must run both the frontend and the backend.

### Terminal A: The Backend (The Brain)
1. `cd server`
2. `node index.js`
*Wait for: "Server running on port 5000"*

### Terminal B: The Frontend (The Interface)
1. `npm run dev`
2. Click the `http://localhost:5173` link in your terminal.

---

## 🌐 2. Deploying Updates to GitHub Pages

1. **Save your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push origin main
   ```
2. **Build and Deploy the website:**
   ```bash
   npm run deploy
   ```
3. **Verify Settings on GitHub:**
   - Go to your repo -> **Settings** -> **Pages**.
   - Ensure "Branch" is set to **`gh-pages`** (NOT `main`).

---

## 🎨 3. Using "Hustle-Free" Custom Buttons

1. On the Dashboard, click **"Customize Board"**.
2. **Label**: Change what the button says (e.g., "YouTube").
3. **Value**: Type any of the following:
   - **A Website**: `https://youtube.com`
   - **A PC App**: `calc`, `notepad`, `mspaint`
   - **A Command**: `shutdown /s /t 60`
   - **A File Path**: `C:\Games\Game.exe`
4. Click **"Exit Customization"** to lock and save.

---

## 🛑 4. Troubleshooting Common Errors

### Error: "Expected a JavaScript-or-Wasm module script but... responded with text/jsx"
*   **Reason:** GitHub Pages is serving your source code (`main` branch) instead of your build (`gh-pages` branch).
*   **Fix:** Go to **Settings > Pages** and switch the branch to **`gh-pages`**.

### Error: "ERR_CONNECTION_REFUSED" (on port 5000)
*   **Reason:** Your browser is looking for your backend, but it's not running.
*   **Fix:** Ensure you have a terminal open running `node index.js` inside the `server` folder.

### Error: No data appearing on GitHub Pages / Vercel
*   **Reason:** Browsers block "Insecure" connections (HTTP) from "Secure" sites (HTTPS).
*   **Fix:** Click the **Shield Icon** in your browser's address bar and click **"Allow Insecure Content"** or **"Load Unsafe Scripts"**.

---

## 📝 5. Prompt for Gemini (Next Session)

Copy and paste this if you start a new chat:

> "I am working on the Smart Desktop Control Panel. Please read the `HELP.md` file in my root directory to understand my current setup, running procedures, and deployment configuration. I need help with [INSERT YOUR NEW REQUEST HERE]."
