import { useState } from 'react';
import { MovieCard } from './MovieCard';
import { MessageCircle, Star, Search, X } from 'lucide-react';
import { ChatBotModal } from './ChatBotModal';
import { movies, getMoviesByGenre, getTopRatedMovies } from '../data/movies';

interface SuggestPageProps {
  onMovieClick: (movieId: number) => void;
}

export function SuggestPage({ onMovieClick }: SuggestPageProps) {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('Бүгд');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // NEW: AI states
  const [aiGenre, setAiGenre] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMovies, setAiMovies] = useState<any[]>([]);
  const [aiMessage, setAiMessage] = useState('');

  const genres = [
    'Бүгд', 'Адал явдал', 'Аймшиг', 'Драм', 
    'Инээдмийн', 'Уран зөгнөлт', 'Романтик', 'Триллер'
  ];

  const topRated = getTopRatedMovies(3);

  // SEARCH
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(query.trim() !== '');
  };

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearching(false);
  };

  const getFilteredMovies = () => {
    if (isSearching) {
      const q = searchQuery.toLowerCase();
      return movies.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.genre.some(g => g.toLowerCase().includes(q)) ||
        m.director.toLowerCase().includes(q) ||
        m.cast.some(c => c.toLowerCase().includes(q))
      );
    }
    return getMoviesByGenre(selectedGenre);
  };

  const filteredMovies = getFilteredMovies();

  // ============================================================
  // ✅ AI BACKEND CALL (old behavior preserved)
  // ============================================================
  const handleAiSubmit = async () => {
    if (!aiGenre.trim()) {
      setAiMessage("Та төрөлөө оруулна уу.");
      return;
    }

    setAiMessage(`AI-аас санал авч байна... 🎬`);
    setAiMovies([]);
    setAiLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: aiGenre }),
      });

      const data = await res.json();

      if (Array.isArray(data.answer)) {
        setAiMovies(data.answer);
        setAiMessage("");
      } else {
        setAiMessage(data.answer);
      }
    } catch (err) {
      setAiMessage("⚠️ Серверээс хариу авч чадсангүй.");
    }

    setAiGenre("");
    setAiLoading(false);
  };

  return (
    <>
      <section className="px-4 sm:px-8 pt-32 pb-24 md:px-16 lg:px-24 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="mb-12">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl mb-4">
              Санал болгох кинонууд
            </h1>
            <p className="text-[#B3B3B3] text-sm sm:text-base lg:text-lg">
              Таны сонирхолд нийцсэн кинонууд. AI-аас тусламж авч болно.
            </p>
          </div>

          {/* ======================================================
             AI Recommendation Box
          ======================================================= */}
          <div className="mb-12 bg-[#1A1A1A] p-6 rounded-2xl border border-white/10">
            <h3 className="text-white text-lg mb-3">AI-гаар санал авах</h3>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Жишээ: Аймшигтай, Инээдмийн..."
                value={aiGenre}
                onChange={(e) => setAiGenre(e.target.value)}
                className="flex-1 bg-[#0F0F0F] text-white p-3 rounded-xl border border-white/10"
              />
              <button
                onClick={handleAiSubmit}
                disabled={aiLoading}
                className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl text-white font-semibold transition"
              >
                {aiLoading ? "AI..." : "Авах"}
              </button>
            </div>

            {aiMessage && (
              <p className="text-blue-400 mt-3 text-sm">{aiMessage}</p>
            )}
          </div>

          {/* ======================================================
             AI MOVIE RESULTS
          ======================================================= */}
          {aiMovies.length > 0 && (
            <div className="mb-16">
              <h2 className="text-white text-2xl mb-6">
                🤖 AI санал болгосон кинонууд
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {aiMovies.map((movie, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5"
                  >
                    <img
                      src={movie.poster?.startsWith("http") ? movie.poster : "/forest.jpg"}
                      alt={movie.title}
                      className="w-full h-72 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg">{movie.title}</h3>
                      <p className="text-yellow-400 mt-1">⭐ {movie.rating}</p>
                      <a
                        href={movie.imdb_url}
                        target="_blank"
                        className="text-blue-400 text-sm underline mt-2 inline-block"
                      >
                        IMDB линк
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH */}
          <div className="mb-12">
            <div className="bg-[#1A1A1A] rounded-2xl p-4 sm:p-6 border border-white/10">
              <h3 className="text-white text-lg sm:text-xl mb-4">Кино хайх</h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3]" size={20} />
                <input
                  type="text"
                  placeholder="Киноны нэр, төрөл, найруулагч..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-[#0F0F0F] text-white pl-12 pr-12 py-3 rounded-xl border border-white/10"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#B3B3B3]"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
              {isSearching && (
                <p className="text-[#B3B3B3] text-sm mt-3">
                  {filteredMovies.length} кино олдлоо
                </p>
              )}
            </div>
          </div>

          {/* TOP RATED */}
          {!isSearching && (
            <div className="mb-12 bg-gradient-to-r from-[#3B82F6]/10 to-[#2563EB]/10 rounded-3xl p-6 border border-[#3B82F6]/20">
              <div className="flex items-center gap-3 mb-6">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
                <h2 className="text-white text-xl sm:text-2xl">Хамгийн өндөр үнэлгээтэй</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topRated.map(movie => (
                  <div
                    key={movie.id}
                    onClick={() => onMovieClick(movie.id)}
                    className="bg-[#1A1A1A] rounded-2xl p-4 border border-white/5 hover:border-[#3B82F6]/50 cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-28 rounded-xl overflow-hidden">
                        <img src={movie.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white text-sm mb-2">{movie.title}</h3>
                        <div className="flex gap-2 mb-2">
                          {movie.genre.slice(0, 2).map((g, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-[#0F0F0F] text-[#B3B3B3] rounded">
                              {g}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="text-yellow-400 fill-yellow-400" size={16} />
                          <span className="text-white text-sm">{movie.rating}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GENRE FILTER */}
          {!isSearching && (
            <div className="mb-12">
              <h3 className="text-white mb-4">Төрөл сонгох</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map(g => (
                  <button
                    key={g}
                    onClick={() => setSelectedGenre(g)}
                    className={`px-4 py-2 rounded-full ${
                      selectedGenre === g
                        ? 'bg-[#3B82F6] text-white'
                        : 'bg-[#1A1A1A] text-[#B3B3B3]'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* MOVIES GRID */}
          <div className="mb-16">
            <h3 className="text-white text-xl mb-6">
              {isSearching
                ? `Хайлтын үр дүн (${filteredMovies.length})`
                : selectedGenre === 'Бүгд'
                ? `Бүх кинонууд (${filteredMovies.length})`
                : `${selectedGenre} (${filteredMovies.length})`}
            </h3>

            {filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredMovies.map(movie => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => onMovieClick(movie.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-[#1A1A1A] rounded-2xl p-8 text-center border border-white/5">
                <Search size={48} className="text-[#B3B3B3] mx-auto mb-4" />
                <p className="text-white text-xl mb-2">Хайлтын үр дүн олдсонгүй</p>
                <p className="text-[#B3B3B3]">
                  Өөр түлхүүр үгээр дахин оролдож үзнэ үү.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* CHATBOT BUTTON */}
      <button
        onClick={() => setIsChatBotOpen(true)}
        className="fixed bottom-6 right-6 bg-[#3B82F6] text-white p-4 rounded-full shadow-xl hover:scale-110 transition"
      >
        <MessageCircle size={26} />
      </button>

      {/* CHATBOT MODAL */}
      <ChatBotModal
        isOpen={isChatBotOpen}
        onClose={() => setIsChatBotOpen(false)}
      />
    </>
  );
}
