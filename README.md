# 📈 InvestIQ – AI-Powered Investment Research Dashboard

<p align="center">
  <img src="/frontend/public/dashboard.png" width="100%">
</p>

<div align="center">

### Intelligent Stock Research & Company Comparison Platform

Analyze publicly listed companies using **real-time financial data**, **latest news**, and **AI-powered investment insights**.

Built using **React**, **Node.js**, **Express**, **LangChain**, **Google Gemini/OpenRouter**, and **Yahoo Finance APIs**.

</div>

---

# 📖 Overview

InvestIQ is an AI-powered investment research dashboard that helps users analyze and compare publicly listed companies using real-time financial information.

The application combines live financial data, recent news, and Large Language Models (LLMs) to generate investment insights including SWOT analysis, financial health assessment, recommendations, and side-by-side company comparisons.

Unlike traditional dashboards that only display financial metrics, InvestIQ explains **why** a company may be a good or poor investment using AI-generated reasoning.

---

# ✨ Features

## 📊 Company Analysis

- Search any publicly listed company
- Real-time financial data
- Company profile
- Key financial metrics
- Latest company news
- AI-generated SWOT Analysis
- AI Investment Recommendation
- Investment Confidence Score
- Overall Investment Score
- Risk Assessment
- Investment Horizon

---

## ⚖️ Company Comparison

Compare two companies side-by-side including:

- Company Overview
- Financial Metrics
- SWOT Comparison
- AI Investment Verdict
- Executive Summary
- Overall Investment Scores
- Confidence Scores
- Risk Levels
- Investment Horizon
- AI Winner Selection

---

## 🤖 AI Features

- AI SWOT Analysis
- Executive Summary
- Investment Reasoning
- Confidence Score
- Overall Score
- Risk Assessment
- Investment Recommendation
- Company Comparison

---

## 📈 Live Market Data

Real-time data includes:

- Market Capitalization
- Revenue
- Net Income
- Revenue Growth
- P/E Ratio
- Employee Count
- Industry
- CEO
- Headquarters
- Website

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- JavaScript
- Lucide React

---

## Backend

- Node.js
- Express.js
- REST APIs

---

## AI

- LangChain
- Google Gemini API
- OpenRouter (Supported)

---

## APIs

- Yahoo Finance API
- Yahoo Finance News
- NewsAPI (Optional)

---

# 📂 Project Structure

```
InvestIQ
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── assets
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   └── package.json
│
├── backend
│   ├── services
│   │   ├── analyzer.js
│   │   ├── yahoo.js
│   │   └── news.js
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/InvestIQ.git

cd InvestIQ
```

---

## Backend

```bash
cd backend

npm install

npm start
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
GEMINI_API_KEY=your_api_key

OPENROUTER_API_KEY=your_api_key

NEWS_API_KEY=your_api_key

PORT=5000
```

---

# 🌐 API Endpoints

## Analyze Company

```
POST /api/analyze
```

Example

```json
{
  "company": "Apple"
}
```

---

## Compare Companies

```
POST /api/compare
```

Example

```json
{
  "company1": "Apple",
  "company2": "Microsoft"
}
```

---

## Health Check

```
GET /health
```

---

# 🧠 System Workflow

```
User Search
      │
      ▼
Yahoo Finance API
      │
      ▼
Latest Company News
      │
      ▼
LangChain Pipeline
      │
      ▼
Google Gemini / OpenRouter
      │
      ▼
Investment Analysis
      │
      ▼
Dashboard Visualization
```

---

# 📸 Screenshots

Add screenshots here after completing the project.

- 🏠 Home Page
- 🔍 Company Analysis
- 📊 Financial Dashboard
- 🤖 AI SWOT Analysis
- ⚖️ Compare Companies
- 📈 AI Investment Verdict

---

# 🚀 Future Enhancements

- User Authentication
- Portfolio Tracking
- Stock Watchlist
- Historical Price Charts
- PDF Investment Reports
- AI Chatbot Assistant
- Portfolio Risk Analysis
- Multiple Company Comparison
- Real-time Market Alerts
- Cloud Deployment

---

# 🌐 Deployment Guide (Render + Vercel)

This application is configured for full-stack cloud deployment, hosting the **React Frontend on Vercel** and the **Node.js Backend on Render**.

### 1. Deploy Backend to Render
1. Log in to the [Render Dashboard](https://dashboard.render.com/).
2. Click **New** (top-right button) -> **Web Service**.
3. Link your Git repository.
4. Configure the Web Service:
   - **Name**: `investiq-backend`
   - **Runtime**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
5. Go to the **Environment** tab and add the environment variables:
   - `GEMINI_API_KEY`: (Your Google Gemini API Key)
   - `NEWS_API_KEY`: (Your News API Key, optional if not using customized news endpoint)
   - `PORT`: `5000`
6. Click **Create Web Service**.
7. Once deployed, copy your backend's public Render URL (e.g. `https://investiq-backend.onrender.com`).

*Note:* Alternatively, you can use Render Blueprints to automatically set this up via the provided `render.yaml` file.

### 2. Connect Vercel Frontend
1. Log in to your [Vercel Dashboard](https://vercel.com/).
2. Select your **InvestIQ** frontend project.
3. Navigate to **Settings** -> **Environment Variables**.
4. Create/Edit the following environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://investiq-backend.onrender.com` (Use your actual Render backend URL without a trailing slash)
5. Save the variable.
6. Go to the **Deployments** tab on Vercel, select your latest deployment, click the three dots, and click **Redeploy** to build the application with the new API target.

---

# 🎯 Learning Outcomes

This project demonstrates practical knowledge of:

- React.js
- Node.js
- Express.js
- REST API Development
- LangChain
- Prompt Engineering
- AI Integration
- Financial Data Processing
- API Integration
- Responsive UI Design
- Modern Dashboard Development

---

# 👨‍💻 Author

**Balu Parasa**

B.Tech CSE

Lovely Professional University

---

# ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.

---

# 📄 License

This project is developed for educational purposes.