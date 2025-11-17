import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { SuggestPage } from './components/SuggestPage';
import { LoginPage } from './components/LoginPage';
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

  // Check localStorage on first load
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      setUserName('Amgalanbaatar'); // Fixed single account
    }
    const storedReviews = localStorage.getItem('userReviews');
    if (storedReviews) {
      setUserReviews(JSON.parse(storedReviews));
    }
  }, []);

  // Persist login state
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }, [isLoggedIn]);

  // Persist reviews
  useEffect(() => {
    localStorage.setItem('userReviews', JSON.stringify(userReviews));
  }, [userReviews]);

  // Login handler
  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserName('Amgalanbaatar');
    setCurrentPage('home');
  };

  // Logout handler
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setCurrentPage('home');
    localStorage.removeItem('isLoggedIn');
  };

  // Movie click handler
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

  // Add review handler
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
      date: new Date().toISOString().split('T')[0]
    };

    setUserReviews([newReview, ...userReviews]);
  };

  // Delete review handler
  const handleDeleteReview = (reviewId: number) => {
    setUserReviews(userReviews.filter(r => r.id !== reviewId));
  };

  // Navigation handler
  const handleNavigate = (page: string) => {
    if (page === 'dashboard' && !isLoggedIn) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
    setSelectedMovieId(null);
  };

  // Render current page
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
        return <LoginPage onLogin={handleLogin} />;
      case 'dashboard':
        return isLoggedIn ? (
          <DashboardPage
            userReviews={userReviews}
            onAddReview={handleAddReview}
            onDeleteReview={handleDeleteReview}
          />
        ) : (
          <LoginPage onLogin={handleLogin} />
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
