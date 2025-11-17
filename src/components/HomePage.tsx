import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { MovieCard } from './MovieCard';
import { ChatBotModal } from './ChatBotModal';
import { getTopRatedMovies } from '../data/movies';
import { Play, Star, TrendingUp, MessageCircle } from 'lucide-react';

interface HomePageProps {
  onMovieClick: (movieId: number) => void;
  onNavigate?: (page: string) => void;
}

export function HomePage({ onMovieClick, onNavigate }: HomePageProps) {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  
  const topMovies = getTopRatedMovies(4);
  const heroMovie = topMovies[0];

  const handleGetStarted = () => {
    if (onNavigate) {
      onNavigate('suggest');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="px-4 sm:px-8 pt-32 pb-24 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#3B82F6]/20 px-4 py-2 rounded-full text-[#3B82F6]">
                <TrendingUp size={18} />
                <span>Шинэ гарсан</span>
              </div>
              <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                {heroMovie.title}
              </h1>
              <p className="text-[#B3B3B3] text-base sm:text-lg md:text-xl max-w-xl">
                {heroMovie.description}
              </p>
              <div className="flex items-center gap-4 flex-wrap">
                <button 
                  onClick={() => onMovieClick(heroMovie.id)}
                  className="bg-[#3B82F6] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-[#2563EB] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <Play size={20} />
                  Үзэх
                </button>
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="text-white">{heroMovie.rating}/10</span>
                  <span className="text-[#B3B3B3]">IMDb</span>
                </div>
              </div>
            </div>

            {/* Hero Poster */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group cursor-pointer" onClick={() => onMovieClick(heroMovie.id)}>
                <div className="absolute -inset-4 bg-[#3B82F6] opacity-20 blur-3xl rounded-3xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <ImageWithFallback
                  src={heroMovie.image}
                  alt={heroMovie.title}
                  className="relative w-full max-w-md h-[400px] sm:h-[500px] md:h-[600px] object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rated Movies */}
      <section className="px-4 sm:px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl">
              Өндөр үнэлгээтэй кинонууд
            </h2>
            <div className="hidden sm:flex items-center gap-2 text-[#B3B3B3]">
              <Star className="text-yellow-400 fill-yellow-400" size={20} />
              <span className="text-sm sm:text-base">Шилдэг сонголт</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                onClick={() => onMovieClick(movie.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-8 py-16 md:px-16 lg:px-24 bg-[#0F0F0F]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl mb-4">
              Яагаад биднийг сонгох вэ?
            </h2>
            <p className="text-[#B3B3B3] text-base sm:text-lg max-w-2xl mx-auto">
              Бид танд хамгийн сайн кино үзэх туршлага өгөхийн тулд ажилладаг
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#1A1A1A] rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-[#3B82F6]/50 transition-colors">
              <div className="w-14 h-14 bg-[#3B82F6]/20 rounded-2xl flex items-center justify-center mb-6">
                <Star className="text-[#3B82F6]" size={28} />
              </div>
              <h3 className="text-white text-lg sm:text-xl mb-3">Үнэнч үнэлгээ</h3>
              <p className="text-[#B3B3B3] text-sm sm:text-base">
                IMDb датасетаас авсан хэрэглэгчдийн үнэнч үнэлгээ, сэтгэгдлүүдийг үзэх боломжтой
              </p>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-[#3B82F6]/50 transition-colors">
              <div className="w-14 h-14 bg-[#3B82F6]/20 rounded-2xl flex items-center justify-center mb-6">
                <Play className="text-[#3B82F6]" size={28} />
              </div>
              <h3 className="text-white text-lg sm:text-xl mb-3">Өргөн сонголт</h3>
              <p className="text-[#B3B3B3] text-sm sm:text-base">
                1000 гаруй кинонуудаас өөрт тохирохыг нь сонгох боломжтой
              </p>
            </div>
            <div className="bg-[#1A1A1A] rounded-2xl p-6 sm:p-8 border border-white/5 hover:border-[#3B82F6]/50 transition-colors">
              <div className="w-14 h-14 bg-[#3B82F6]/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="text-[#3B82F6]" size={28} />
              </div>
              <h3 className="text-white text-lg sm:text-xl mb-3">Хиймэл оюун ухаан</h3>
              <p className="text-[#B3B3B3] text-sm sm:text-base">
                Манай AI туслах таны таашаалд нийцсэн кино санал болгоно
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-8 py-24 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1739433437912-cca661ba902f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzYzMTA4MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cinema"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">
                Өөрийн дуртай киногоо сонгоод сэтгэгдэл үлдээ
              </h2>
              <p className="text-white/90 text-base sm:text-lg mb-8 max-w-2xl mx-auto">
                Нэвтэрч ороод өөрийн үнэлгээ, сэтгэгдлээ бусадтай хуваалцаарай
              </p>
              <button 
                onClick={handleGetStarted}
                className="bg-white text-[#3B82F6] px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:scale-105"
              >
                Эхлэх
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Chatbot Button */}
      <button
        onClick={() => setIsChatBotOpen(true)}
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[#3B82F6] text-white p-3 sm:p-4 rounded-full shadow-2xl hover:bg-[#2563EB] transition-all duration-300 hover:scale-110 z-40"
      >
        <MessageCircle size={24} className="sm:w-7 sm:h-7" />
      </button>

      {/* Chatbot Modal */}
      <ChatBotModal
        isOpen={isChatBotOpen}
        onClose={() => setIsChatBotOpen(false)}
      />
    </>
  );
}
