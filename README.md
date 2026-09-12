# Groq LLM Chatbot

A simple, full-stack AI chatbot built with **Next.js** and powered by the **Groq API** for fast LLM inference. Deployed live on **Vercel**.

## 🔗 Live Demo
- **Live URL:** _add your deployed Vercel URL here_
- **GitHub repo:** _add your repo URL here_

## 🧠 Model Used
This project uses **`llama-3.1-8b-instant`** on Groq (fast, low-latency, great for chat).
You can swap the model by changing the `MODEL` constant in `app/api/chat/route.js` to any model available in your Groq console (e.g. `llama-3.3-70b-versatile`, `gemma2-9b-it`, `mixtral-8x7b-32768`).

## ✨ Features
- Clean chat UI with scrollable message history (input box + send button).
- Conversation context maintained for the current browser session (in React state).
- Backend API route (`/api/chat`) keeps the Groq API key secret — never exposed to the browser.
- Graceful error handling (rate limits / network errors show a friendly message instead of crashing).
- "Assistant is typing…" indicator while waiting for a response.
- Enter to send, Shift+Enter for a new line.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router) + React
- **Backend:** Next.js API route (serverless function)
- **LLM Provider:** Groq API
- **Hosting:** Vercel

## 🚀 Running Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your Groq API key**
   - Get a free key at [console.groq.com](https://console.groq.com)
   - Copy `.env.local.example` to `.env.local`
   - Paste your key:
     ```
     GROQ_API_KEY=your_actual_key_here
     ```

4. **Run the dev server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deploying to Vercel

1. Push this repo to GitHub (make sure `.env.local` is **not** committed — it's already in `.gitignore`).
2. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo.
3. Under **Project Settings → Environment Variables**, add:
   - `GROQ_API_KEY` = your Groq API key
4. Click **Deploy**.
5. Open the generated live URL and confirm the chatbot works, exactly as it did locally.

## 📸 Screenshot

_Add a screenshot of a sample conversation here, e.g._
```
![Sample conversation](./screenshot.png)
```

## 📄 Notes
- The API key is only ever used server-side in `app/api/chat/route.js`, so it is never exposed to the client.
- Conversation history is kept in memory (React state) for the current page session only — it resets on refresh. This satisfies "maintains context for the current session"; you could extend it with `localStorage` or a database for persistence across sessions.
