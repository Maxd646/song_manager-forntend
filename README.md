# Song Manager Frontend

A modern, responsive music management dashboard built with React, Redux, Emotion, and a custom Webpack setup.

## Project Overview

This project is a full-featured frontend for managing songs, artists, and playlists. It features a beautiful dashboard, CRUD operations, authentication, and a modern UI with glassmorphism and animations.

## Webpack Setup

- **Manual Configuration:**
  - The project uses a custom `webpack.config.js` (not Create React App).
  - Handles JS/JSX, CSS, images, and font assets.
  - Supports hot module replacement and environment variables.
  - Entry: `src/index.js`, Output: `dist/bundle.js`.
  - Babel is used for ES6+ and JSX transpilation.
  - CSS is handled with Emotion (CSS-in-JS), but Webpack is configured for global styles and assets.

## AI-Generated Parts

- Some UI components, layout suggestions, and code snippets were generated or refactored with the help of AI (ChatGPT/Copilot), especially for:
  - Responsive grid and card layout
  - SVG snake line separator and movtion
-

## Manual Implementation & Problem-Solving

- The overall project structure, Redux logic, Webpack config, and most React logic were implemented manually.
- Problem-solving steps included:
  - Debugging layout issues (e.g., grid cut-off, card alignment)
  - Customizing Webpack for development and production
  - Integrating file uploads and media previews
  - Ensuring accessibility and responsiveness

## How Code Was Verified

- **Manual Testing:**
  - Ran the app locally with `npm start` and verified all features (add/edit/delete songs, search, pagination, media playback).
  - Checked layout on desktop, tablet, and mobile.
  - Used browser DevTools to debug and inspect elements.
- **Debugging Steps:**
  - Fixed CORS, API, and layout issues as they arose.
  - Used console logs and React DevTools for state inspection.

## Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- Python 3.8+ and Django for the backend

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/song-manager-frontend.git
cd song-manager-frontend
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables (Optional)

- By default, the frontend expects the backend API at `http://localhost:8000`.
- To change this, create a `.env` file and set:
  ```
  REACT_APP_API_URL=http://localhost:8000
  ```

### 4. Start the Django Backend

- Make sure your Django backend is running on port 8000:

```bash
python manage.py runserver
```

### 5. Start the Frontend

```bash
npm start
```

- The app will open at [http://localhost:3000](http://localhost:3000) or [http://localhost:8080](http://localhost:8080) depending on your setup.

### 6. Using the App

- Register or log in.
- Add, edit, and delete songs.
- Enjoy the modern dashboard UI!

---

## Preference: Manual Implementation

While AI was used for some suggestions and code generation, the majority of the project was implemented and debugged manually to demonstrate real-world problem-solving and frontend engineering skills.

---

**Enjoy your Song Manager dashboard!**
