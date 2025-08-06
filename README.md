# OAuth Dashboard

This is a secure and responsive dashboard built as a take-home assignment for Markaba

🔗 **Live Demo:** [markaba-task.vercel.app](https://markaba-task.vercel.app)

---

## 🧰 Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase Auth](https://firebase.google.com/docs/auth) (Google & GitHub OAuth)
- [NewsData.io](https://newsdata.io/) for live tech news API
- [Vercel](https://vercel.com/) for deployment

---

## 🛠️ Getting Started (Local Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/markaba-task.git
cd markaba-task
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root and add:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_NEWS_API_KEY=your_newsdata_api_key
```

> Get Firebase values from [Firebase Console](https://console.firebase.google.com/)  
> Get your free API key at [newsdata.io](https://newsdata.io/)

### 4. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

---

## 🔐 Firebase OAuth Configuration

1. Go to your Firebase project → `Authentication` → `Sign-in method`
2. Enable both **Google** and **GitHub** providers
3. For **GitHub**:
   - Register your app on [GitHub Developer Settings](https://github.com/settings/developers)
   - Set **Authorization Callback URL** as:  
     `http://localhost:5173` (or your deployed domain)
   - Copy **Client ID** and **Client Secret** into Firebase setup

---

## 📦 Build for Production

```bash
npm run build
```

---

## 📄 Credits

- News API powered by [NewsData.io](https://newsdata.io/)
- Icons from [Heroicons](https://heroicons.com/)
- Hosting via [Vercel](https://vercel.com/)
