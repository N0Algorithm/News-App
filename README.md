# AkNews 📰

A modern, premium editorial news application built with React.js featuring smooth animations, dark/light mode, and a professional design inspired by top news platforms.

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-FF0055?logo=framer)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?logo=bootstrap)

## ✨ Features

### Core Features

- 🏠 **Editorial Homepage** - Hero section, featured articles grid, infinite scroll
- 📖 **Article Detail Page** - Full article view with social sharing
- 🔖 **Bookmarks** - Save articles with localStorage persistence
- 🌓 **Dark/Light Mode** - Smooth theme transitions with system preference detection
- 📱 **Responsive Design** - Mobile-first approach for all screen sizes

### Premium Animations (Framer Motion)

- Card hover lift with image zoom
- Staggered headline reveal on load
- Sticky shrinking header with glass effect
- Image blur-up loading effect
- Smooth day/night color transitions
- Reduced motion support for accessibility

### Design System

- Custom CSS variables for consistent theming
- Liquid glass effects (glassmorphism)
- WCAG AA compliant color contrast
- Typography: Inter + Playfair Display fonts

## 🛠️ Tech Stack

| Technology      | Purpose      |
| --------------- | ------------ |
| React 19        | UI Framework |
| React Router    | Navigation   |
| Framer Motion   | Animations   |
| Bootstrap 5     | Grid system  |
| newsdata.io API | News data    |
| localStorage    | Persistence  |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/N0Algorithm/News-App.git
cd News-App
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your API key:

```env
REACT_APP_NEWS_API=your_newsdata_io_api_key
```

4. Start the development server:

```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArticleCard.js   # Card with 4 variants
│   ├── BookmarkButton.js
│   ├── HeroSection.js
│   ├── FeaturedArticles.js
│   ├── BreakingNewsBanner.js
│   ├── Navbar.js
│   ├── ThemeToggle.js
│   └── Loading.js
├── context/             # React Context providers
│   ├── BookmarkContext.js
│   └── ThemeContext.js
├── pages/               # Page components
│   ├── HomePage.js
│   ├── ArticlePage.js
│   └── SavedPage.js
├── styles/              # Design system CSS
│   ├── variables.css    # Color palette & tokens
│   ├── components.css   # Shared styles
│   └── animations.css   # Animation styles
├── utils/               # Utility functions
│   ├── editorialUtils.js
│   └── animations.js    # Framer Motion variants
├── App.js
└── App.css
```

## 🎨 Color Palettes

### Light Mode

| Purpose    | Color       |
| ---------- | ----------- |
| Background | `#FAFAFA` |
| Cards      | `#FFFFFF` |
| Headings   | `#212121` |
| Body Text  | `#424242` |
| Accent     | `#1976D2` |

### Dark Mode

| Purpose    | Color       |
| ---------- | ----------- |
| Background | `#121212` |
| Cards      | `#1E1E1E` |
| Headings   | `#E0E0E0` |
| Body Text  | `#BDBDBD` |
| Accent     | `#4FC3F7` |

## 📜 Available Scripts

| Command           | Description            |
| ----------------- | ---------------------- |
| `npm start`     | Run development server |
| `npm test`      | Run tests              |
| `npm run build` | Build for production   |

## 🔑 Environment Variables

| Variable               | Description         | Required |
| ---------------------- | ------------------- | -------- |
| `REACT_APP_NEWS_API` | newsdata.io API key | Yes      |

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**N0Algorithm**

---

⭐ Star this repo if you found it helpful!
