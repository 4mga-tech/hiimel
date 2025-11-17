# 🎬 AI Bie Daalt - Movie Review Platform

A modern, Netflix-inspired movie review platform built with React, TypeScript, and Tailwind CSS.

## ✨ Features

- 🏠 **Home Page**: Hero section with featured movies and top-rated showcase
- 🎯 **Movie Discovery**: Browse and search movies by title, genre, director, or cast
- 🔍 **Smart Search**: Real-time search functionality
- 🎭 **Genre Filters**: Filter movies by genre categories
- 🎥 **Movie Details**: Comprehensive movie information with user reviews
- 🎬 **IMDb Integration**: Direct links to watch movies on IMDb
- ⭐ **Review System**: Add and manage your own movie reviews
- 👤 **User Authentication**: Login/signup with dashboard
- 🤖 **AI Chatbot**: Get personalized movie recommendations (click outside to close)
- 📱 **Responsive Design**: Works on all screen sizes
- 🌙 **Dark Theme**: Netflix-inspired gradient design (#0F0F0F → #1A1A1A)
- 🎨 **Modern UI**: Smooth animations, gradients, and hover effects
- 🖱️ **Interactive Elements**: Cursor pointers and hover states
- ⬆️ **Smart Navigation**: Auto-scroll to top on page changes

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **Vite** for build tooling

## 📁 Project Structure

```
/
├── components/
│   ├── Header.tsx           # Navigation header with responsive menu
│   ├── HomePage.tsx         # Landing page with chatbot
│   ├── SuggestPage.tsx      # Movie browsing with search
│   ├── MovieDetailPage.tsx  # Movie details and reviews
│   ├── LoginPage.tsx        # Authentication
│   ├── DashboardPage.tsx    # User dashboard
│   ├── MovieCard.tsx        # Movie card component
│   ├── ReviewForm.tsx       # Review submission form
│   ├── ChatBotModal.tsx     # AI chatbot modal
│   └── ui/                  # Shadcn UI components
├── data/
│   └── movies.ts            # Movie data and utilities
├── App.tsx                  # Main app component
└── README.md                # This file
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## 🎯 Key Features Explained

### Search Functionality
Search movies by:
- Movie title
- Description
- Genre
- Director name
- Cast members

### Navigation
- Logo click navigates to home
- All navigation scrolls to top smoothly
- Mobile-responsive hamburger menu

### Chatbot
- Available on Home and Suggest pages
- Floating button in bottom-right corner
- Get AI-powered movie recommendations

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly interface

## 🎨 Design System

### Colors
- Background gradient: `#0F0F0F` → `#1A1A1A`
- Primary blue: `#3B82F6`
- Text gray: `#B3B3B3`
- White text: `#FFFFFF`

### Typography
- Headings: Native font stack with responsive sizes
- Default typography in `/styles/globals.css`
- Avoid Tailwind font classes for consistency

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices (phones) */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (desktops) */
```

## 🔒 Authentication Flow

1. User clicks "Нэвтрэх" (Login)
2. Enters email and name
3. System stores user state
4. Access to dashboard and review features
5. Logout clears user state

## 📝 Code Style

- **TypeScript**: Strict typing
- **Components**: Functional with hooks
- **Naming**: PascalCase for components, camelCase for functions
- **Clean Code**: Minimal and understandable structure

## 🎬 Movie Data

Movies include:
- Title, image, rating
- Genre, year, duration
- Description, director, cast
- User reviews with ratings

Sample genres:
- Адал явдал (Adventure)
- Аймшиг (Horror)
- Драм (Drama)
- Инээдмийн (Comedy)
- Уран зөгнөлт (Sci-Fi)
- Романтик (Romance)
- Триллер (Thriller)

## 🚧 Future Enhancements

- [ ] Backend integration
- [ ] User profiles
- [ ] Movie watchlist
- [ ] Advanced filters
- [ ] Review voting
- [ ] Email notifications
- [ ] Social sharing

## 📄 License

Educational project for AI Bie Daalt.

---

**Built with ❤️ for AI Bie Daalt**