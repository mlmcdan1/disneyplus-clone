# Disney+ Clone 🎬

A responsive Disney+ streaming clone built with React, Firebase, and the TMDb API. This project replicates the core UI/UX of Disney+, allowing users to explore movies, shows, and Disney originals with login functionality.

## 🚀 Features

- 🔐 Firebase Authentication with Google Login
- 🎥 TMDb API integration to fetch real-time movie/show data
- 🎞 Hover video previews (trailers) and detail pages
- 📺 Sections: Disney Originals, Movies, Series, Watchlist
- 🔍 Search functionality
- 🎨 Styled using Styled-Components

## 🔧 Tech Stack

- React
- Firebase (Auth, Firestore, Hosting)
- TMDb API
- Redux Toolkit
- Styled-Components

## 📁 Project Structure

```
├── public
├── src
│   ├── components
│   ├── features
│   ├── firebase.js
│   ├── App.js
│   └── index.js
├── .env
├── firestore.rules
└── firebase.json
```

## 🔑 Environment Variables

Create a `.env` file in the root directory and add:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
```

## 🧪 Setup Instructions

```bash
git clone https://github.com/mlmcdan1/disneyplus-clone.git
cd disneyplus-clone
npm install
npm start
```

## 🚨 Notes

- Firebase Hosting: [Live Project](https://disneyplusclone-f5e5b.web.app)
- Ensure Firebase project and environment variables are properly set up before deployment.

## 📜 License

MIT License
