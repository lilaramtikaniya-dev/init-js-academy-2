# init(); — Learn JavaScript from Scratch

Ek beginner-friendly JS learning website: roadmap-style locked modules, har topic ke baad 5-minute quiz, aur AI doubt-solver chat.

## 1. Local pe chalana (test karne ke liye)

```bash
npm install
npm run dev
```

Browser mein `http://localhost:5173` khol lo.

> Note: AI chat local pe kaam nahi karega jab tak aap Vercel CLI se `vercel dev` use na karo, kyunki `/api/chat` ek serverless function hai (neeche dekho).

## 2. GitHub pe push karo

1. GitHub.com pe ek naya empty repository banao (e.g. `init-js-academy`)
2. Is folder ko us repo se connect karo:

```bash
git init
git add .
git commit -m "init(); JS learning app"
git branch -M main
git remote add origin https://github.com/<your-username>/init-js-academy.git
git push -u origin main
```

## 3. Vercel pe deploy karo (free)

1. [vercel.com](https://vercel.com) pe jaake GitHub se sign up/login karo
2. "Add New Project" → apna `init-js-academy` repo select karo
3. Framework "Vite" auto-detect ho jayega — settings change karne ki zarurat nahi
4. **Environment Variables** mein ek naya variable add karo:
   - Key: `ANTHROPIC_API_KEY`
   - Value: apni Anthropic API key (console.anthropic.com se banayi gayi)
5. "Deploy" pe click karo

2-3 minute mein aapko ek live URL milega (e.g. `init-js-academy.vercel.app`) — yeh aapki real website hai, jo koi bhi browser mein khol sakta hai.

## 4. Apna API key kaise milega

1. [console.anthropic.com](https://console.anthropic.com) pe account banao
2. "API Keys" section mein jaake naya key generate karo
3. Yeh key sirf Vercel ke environment variable mein daalo — kabhi bhi frontend code mein paste na karo, warna koi bhi use kar sakta hai aur aapka billing badhega

## 5. Future updates

Code mein koi bhi change karke `git push` karo — Vercel automatically naya version deploy kar dega.

## Project structure

```
init-js-academy/
├── api/chat.js        ← AI doubt-solver backend (serverless)
├── src/App.jsx        ← Pura app: roadmap, lessons, quizzes, chat UI
├── src/main.jsx       ← React entry point
├── src/index.css      ← Tailwind setup
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```
