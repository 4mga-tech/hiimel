import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SuggestPage } from './components/SuggestPage';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { DashboardPage } from './components/DashboardPage';
import { MovieDetailPage } from './components/MovieDetailPage';
import { movies, getMovieById } from './data/movies';

interface UserReview {
  id: number;
  movieId: number;
  movieTitle: string;
  movieImage: string;
  rating: number;
  comment: string;
  date: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [movieReviews, setMovieReviews] = useState(movies);

  // Load from localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedEmail = localStorage.getItem('userEmail');
    if (storedLogin === 'true' && storedEmail) {
      setIsLoggedIn(true);
      setUserName(storedEmail);
    }

    const storedReviews = localStorage.getItem('userReviews');
    if (storedReviews) {
      setUserReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Save login state
 useEffect(() => {
  if (isLoggedIn) {
    localStorage.setItem('userEmail', userName);
  } else {
    localStorage.removeItem('userEmail');
  }
}, [isLoggedIn, userName]);


  // Save reviews
  useEffect(() => {
    localStorage.setItem('userReviews', JSON.stringify(userReviews));
  }, [userReviews]);

  // Login
  const handleLogin = (email: string) => {
    setIsLoggedIn(true);
    setUserName(email);
    setCurrentPage('home');

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };

  // Movie click
  const handleMovieClick = (movieId: number) => {
    setSelectedMovieId(movieId);
    setCurrentPage('movie-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back from movie detail
  const handleBackFromMovie = () => {
    setSelectedMovieId(null);
    setCurrentPage('suggest');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add review
  const handleAddReview = (movieId: number, rating: number, comment: string) => {
    const movie = getMovieById(movieId);
    if (!movie) return;

    const newReview: UserReview = {
      id: Date.now(),
      movieId,
      movieTitle: movie.title,
      movieImage: movie.image,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };

    setUserReviews([newReview, ...userReviews]);
  };

  // Delete review
  const handleDeleteReview = (reviewId: number) => {
    setUserReviews(userReviews.filter(r => r.id !== reviewId));
  };

  // Navigation
  const handleNavigate = (page: string) => {
    if (page === 'dashboard' && !isLoggedIn) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
    setSelectedMovieId(null);
  };

  // Render pages
  const renderPage = () => {
    if (currentPage === 'movie-detail' && selectedMovieId) {
      const movie = movieReviews.find(m => m.id === selectedMovieId);
      if (movie) {
        return (
          <MovieDetailPage
            movie={movie}
            isLoggedIn={isLoggedIn}
            onBack={handleBackFromMovie}
            onAddReview={handleAddReview}
          />
        );
      }
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onMovieClick={handleMovieClick} onNavigate={handleNavigate} />;

      case 'suggest':
        return <SuggestPage onMovieClick={handleMovieClick} />;

      case 'login':
        return (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );

      case 'register':
        return (
          <RegisterPage
            onSwitchToLogin={() => setCurrentPage('login')}
          />
        );

      case 'dashboard':
        return isLoggedIn ? (
          <DashboardPage
            userReviews={userReviews}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
          />
        ) : (
          <LoginPage
            onLogin={handleLogin}
            onSwitchToRegister={() => setCurrentPage('register')}
          />
        );

      default:
        return <HomePage onMovieClick={handleMovieClick} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] to-[#1A1A1A]">
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLogout={handleLogout}
      />

      {renderPage()}

      {currentPage !== 'movie-detail' && (
        <footer className="py-12 text-center">
          <p className="text-[#B3B3B3] text-sm sm:text-base">
            © 2025 Хиймэл оюун ухаан — Бие даалт
          </p>
        </footer>
      )}
    </div>
  );
}
