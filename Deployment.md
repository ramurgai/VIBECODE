# 🐍 Snake Game Deployment Guide

## 📁 Project Structure

```
snake-game/
├── index.html
├── style.css
├── game.js
└── assets/
    ├── eat.mp3 (optional)
    ├── power.mp3 (optional)
    └── dead.mp3 (optional)
```

---

## 🌐 Hosting Options

You can deploy the game using any static site hosting service. Recommended:

- [GitHub Pages](https://pages.github.com)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Firebase Hosting](https://firebase.google.com/products/hosting)

---

## 🧰 Prerequisites

You only need a modern web browser (Chrome, Firefox, Edge) and optionally:

- A code editor (e.g., VS Code)
- A GitHub account (for GitHub Pages)

---

## 🚀 Deployment Steps

### ✅ Option A: Local Deployment

1. Place the `index.html`, `game.js`, and `style.css` in one folder.
2. Open `index.html` in your browser.
3. Done.

---

### ✅ Option B: GitHub Pages

1. Create a GitHub repository, e.g., `snake-game`.
2. Push your files:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/snake-game.git
git push -u origin main
```

3. Go to **Settings > Pages**, and set source to `main` branch, root directory.
4. Your game will be live at:

```
https://yourusername.github.io/snake-game/
```

---

### ✅ Option C: Netlify

1. Drag and drop your `snake-game` folder into [Netlify Drop](https://app.netlify.com/drop).
2. Alternatively, connect your GitHub repo and deploy.
3. Netlify will give you a live URL.

---

## 🧪 Testing the Deployment

- Open the URL on desktop and mobile.
- Confirm:
  - The game starts with arrow keys.
  - Score and leaderboard work.
  - Boundary toggle (if wired to UI).
  - Power food affects speed.
  - Mirror canvas reflects main game board.

---

## 📦 Optional Enhancements

| Feature         | Description |
|----------------|-------------|
| Favicon         | Add a custom `favicon.ico` in the root. |
| Sound Effects   | Add sound files to `assets/` and wire them in `game.js`. |
| Touch Support   | Add on-screen buttons for mobile players. |
| Settings Toggle | Save user preferences (e.g., boundaries on/off) using `localStorage`. |

---

## 🛠 Example `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Snake Game</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <canvas id="gameCanvas" width="400" height="400"></canvas>
  <canvas id="mirrorCanvas" width="100" height="100"></canvas>

  <div id="deathScreen" style="display:none;">
    <h2>Game Over</h2>
    <p id="finalScore"></p>
    <ul id="leaderboardList"></ul>
    <button onclick="restartGame()">Restart</button>
  </div>

  <script src="game.js"></script>
</body>
</html>
```

---

Let me know if you’d like a CI/CD config, domain setup guide, or a PDF version of this document.
