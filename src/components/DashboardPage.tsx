import { useState, useEffect } from 'react';
import { Star, Edit, Trash2, TrendingUp } from 'lucide-react';
import { ReviewForm } from './ReviewForm';
import { movies } from '../data/movies';

interface UserReview {
  id: number;
  movieId: number;
  movieTitle: string;
  movieImage: string;
  rating: number;
  comment: string;
  date: string;
}

interface DashboardPageProps {
  userReviews: UserReview[];
  onAddReview: (movieId: number, rating: number, comment: string) => void;
  onDeleteReview: (reviewId: number) => void;
}

export function DashboardPage({ userReviews, onAddReview, onDeleteReview }: DashboardPageProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
const [reviews, setReviews] = useState<UserReview[]>([]);

useEffect(() => {
    const saved = localStorage.getItem("userReviews");
    if (saved) setReviews(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("userReviews", JSON.stringify(reviews));
  }, [reviews]);
  
  const handleAddReview = () => {
    setShowReviewForm(true);
  };

  const handleSubmitReview = (rating: number, comment: string) => {
  if (selectedMovieId) {
    const movie = movies.find(m => m.id === selectedMovieId);
    if (!movie) return;

    const newReview: UserReview = {
      id: Date.now(),
      movieId: selectedMovieId,
      movieTitle: movie.title,
  movieImage: movie.poster || movie.image || "https://via.placeholder.com/300x450?text=No+Image",
      rating,
      comment,
      date: new Date().toLocaleDateString("mn-MN")
    };

    setReviews(prev => [...prev, newReview]);
    setShowReviewForm(false);
    setSelectedMovieId(null);
  }
};


  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen pt-24 px-8 pb-16 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-white text-4xl md:text-5xl mb-4">
            Хяналтын самбар
          </h1>
          <p className="text-[#B3B3B3] text-lg">
            Таны үнэлгээ, сэтгэгдлүүдийг энд харах боломжтой
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Star className="fill-white" size={24} />
              </div>
              <TrendingUp size={20} className="opacity-60" />
            </div>
            <div className="text-3xl mb-1">{reviews.length}</div>
            <div className="text-white/80">Нийт сэтгэгдэл</div>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
                <Star className="text-yellow-400 fill-yellow-400" size={24} />
              </div>
            </div>
            <div className="text-white text-3xl mb-1">{averageRating}</div>
            <div className="text-[#B3B3B3]">Дундаж үнэлгээ</div>
          </div>

          <div className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-[#3B82F6]/20 rounded-xl flex items-center justify-center">
                <Edit className="text-[#3B82F6]" size={24} />
              </div>
            </div>
            <div className="text-white text-3xl mb-1">{movies.length}</div>
            <div className="text-[#B3B3B3]">Нийт кинонууд</div>
          </div>
        </div>

        {/* Add Review Section */}
        <div className="bg-[#1A1A1A] rounded-2xl p-8 border border-white/5 mb-12">
          <h2 className="text-white text-2xl mb-6">Шинэ сэтгэгдэл нэмэх</h2>
          
          {!showReviewForm && (
            <div>
              <p className="text-[#B3B3B3] mb-6">
                Та үзсэн киногоо сонгоод өөрийн үнэлгээ, сэтгэгдлээ бичнэ үү
              </p>
              <div className="mb-6">
                <label className="text-[#B3B3B3] text-sm mb-2 block">
                  Кино сонгох
                </label>
                <select
                  value={selectedMovieId || ''}
                  onChange={(e) => setSelectedMovieId(Number(e.target.value))}
                  className="w-full bg-[#0F0F0F] text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#3B82F6]"
                >
                  <option value="">Кино сонгоно уу</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title} ({movie.rating}/10)
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleAddReview}
                disabled={!selectedMovieId}
                className="bg-[#3B82F6] text-white px-6 py-3 rounded-lg hover:bg-[#2563EB] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Сэтгэгдэл бичих
              </button>
            </div>
          )}

          {showReviewForm && selectedMovieId && (
            <ReviewForm
              onSubmit={handleSubmitReview}
              onCancel={() => {
                setShowReviewForm(false);
                setSelectedMovieId(null);
              }}
            />
          )}
        </div>

        {/* User Reviews */}
        <div>
          <h2 className="text-white text-2xl mb-6">
            Таны сэтгэгдлүүд ({reviews.length})
          </h2>
          
          {reviews.length === 0 ? (
            <div className="bg-[#1A1A1A] rounded-2xl p-12 border border-white/5 text-center">
              <Star className="text-[#B3B3B3] mx-auto mb-4" size={48} />
              <p className="text-[#B3B3B3] text-lg">
                Та одоогоор сэтгэгдэл үлдээгээгүй байна
              </p>
              <p className="text-[#B3B3B3] text-sm mt-2">
                Киног үзээд эхний сэтгэгдлээ бичээрэй!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-24 h-36 rounded-xl overflow-hidden">
                      <img
                        src={review.movieImage}
                        alt={review.movieTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-white text-xl mb-1">
                            {review.movieTitle}
                          </h3>
                          <p className="text-[#B3B3B3] text-sm">{review.date}</p>
                        </div>
                        <button
  onClick={() => setReviews(prev => prev.filter(r => r.id !== review.id))}
  className="text-red-400 hover:text-red-300 p-2 hover:bg-red-400/10 rounded-lg transition-colors"
>
  <Trash2 size={20} />
</button>
                      </div>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(10)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-[#B3B3B3]'
                            }
                          />
                        ))}
                        <span className="text-white ml-2">{review.rating}/10</span>
                      </div>
                      <p className="text-[#B3B3B3] leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
