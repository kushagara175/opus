<div align="center">
<img width="1200" height="475" alt="Opus Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />

# Opus (FuturePDF) — The Next Generation of Documents

An AI-powered document and PDF generation studio featuring a modern cosmic aesthetic, 3D floating visual elements, real-time multi-page document design, and intelligent generative content fabrication.

[![Created in Google AI Studio](https://img.shields.io/badge/Created%20in-Google%20AI%20Studio-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.studio/apps/drive/1KP0JU4uL9mk6o74ZfmfG4UTcOBlp_ac5)
[![Vite](https://img.shields.io/badge/Vite-6.2+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

### 🌐 Where It Was Created
This project was originally designed, architected, and prototyped in **[Google AI Studio](https://ai.studio/)**.

🔗 **AI Studio App Link:** [Open in AI Studio](https://ai.studio/apps/drive/1KP0JU4uL9mk6o74ZfmfG4UTcOBlp_ac5)

</div>

---

## ✨ Features

- **🤖 AI Document Generation**: Leverages Google Gemini models (`gemini-2.5-flash` / `gemini-2.5-flash-lite`) and Claude to automatically draft, structure, outline, and refine complex documents.
- **🎨 Interactive Document Canvas**: Real-time layout previews with custom styles:
  - Minimalist White
  - Deep Space
  - Cyberpunk Terminal
  - Editorial Warm
  - Executive Clean
- **📄 Multi-Format Document Ingestion**: Upload `.docx`, `.pdf`, `.txt`, `.md`, or images to extract structure and rewrite or restyle documents into polished outputs.
- **⚡ Dual PDF Export Engines**:
  - **Client-Side Export**: Instant in-browser conversion via `html2pdf.js`.
  - **Headless Server Export**: Backend Puppeteer-powered engine generating pixel-perfect, print-ready A4 PDFs.
- **🌌 Cosmic Micro-Interactions**: Smooth animations powered by Framer Motion, dynamic parallax cloud backgrounds, and responsive dark/light theme accents.

---

## 📁 Project Structure

```
opus/
├── components/                 # React UI Components
│   ├── CloudBackground.tsx    # Parallax cloud backdrop
│   ├── Dashboard.tsx          # Main document editor and AI generator
│   ├── FloatingProduct.tsx    # 3D interactive hero showcase
│   ├── Hero.tsx               # Landing page hero section
│   ├── HowItWorks.tsx         # Product workflow breakdown
│   ├── Navbar.tsx             # Responsive header navigation
│   ├── Pricing.tsx            # Subscription tier comparison
│   └── Footer.tsx             # Site footer
├── backend/                   # Node.js Puppeteer PDF Rendering Server
│   ├── server.js              # Express PDF export microservice
│   ├── package.json           # Backend dependencies (express, puppeteer)
│   └── .gitignore
├── public/                    # Static assets (3D models, textures, images)
├── App.tsx                    # Root application component
├── index.html                 # HTML entry point with Tailwind & font imports
├── index.tsx                  # React DOM client entry point
├── vite.config.ts             # Vite configuration with API key injection
├── metadata.json              # App metadata
└── README.md                  # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** / **pnpm**
- A **Google Gemini API Key** (from [Google AI Studio](https://aistudio.google.com/))

---

### 1. Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/kushagara175/opus-.git
   cd opus-
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will start at `http://localhost:3000` (or `http://localhost:3001` if port 3000 is occupied).

---

### 2. Backend PDF Server (Optional)

The backend provides high-fidelity, server-side PDF generation using headless Chromium (Puppeteer):

1. **Navigate to the backend folder:**
   ```bash
   cd backend
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Start the backend server:**
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3001` (or custom `PORT`).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler & Dev Server** | [Vite 6](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **AI Integration** | [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) |
| **Backend & Export** | [Express](https://expressjs.com/) & [Puppeteer](https://pptr.dev/) |
| **Original Origin** | [Google AI Studio](https://ai.studio/apps/drive/1KP0JU4uL9mk6o74ZfmfG4UTcOBlp_ac5) |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
