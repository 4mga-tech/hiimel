import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star, ThumbsUp, ArrowLeft, Clock, Calendar, ExternalLink, Play } from 'lucide-react';
import { Movie } from '../data/movies';
import { ReviewForm } from './ReviewForm';

interface MovieDetailPageProps {
  movie: Movie;
  isLoggedIn: boolean;
  onBack: () => void;
  onAddReview: (movieId: number, rating: number, comment: string) => void;
}

export function MovieDetailPage({ movie, isLoggedIn, onBack, onAddReview }: MovieDetailPageProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);

  const handleSubmitReview = (rating: number, comment: string) => {
    onAddReview(movie.id, rating, comment);
    setShowReviewForm(false);
  };

  return (
    <div className="min-h-screen pt-24 px-8 pb-16 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Буцах</span>
        </button>

        {/* Movie Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Poster */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-[#3B82F6] opacity-20 blur-3xl rounded-3xl"></div>
              <ImageWithFallback
                src={movie.image}
                alt={movie.title}
                className="relative w-full aspect-[2/3] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-white text-4xl md:text-5xl">{movie.title}</h1>
            
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 bg-[#1A1A1A] px-4 py-2 rounded-lg">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="text-white">{movie.rating}/10</span>
              </div>
              <div className="flex items-center gap-2 text-[#B3B3B3]">
                <Calendar size={18} />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2 text-[#B3B3B3]">
                <Clock size={18} />
                <span>{movie.duration}</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {movie.genre.map((g, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-[#1A1A1A] text-[#B3B3B3] rounded-full text-sm"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-[#B3B3B3] text-lg leading-relaxed">
              {movie.description}
            </p>

            <div className="space-y-3">
              <div>
                <span className="text-[#B3B3B3]">Найруулагч: </span>
                <span className="text-white">{movie.director}</span>
              </div>
              <div>
                <span className="text-[#B3B3B3]">Жүжигчид: </span>
                <span className="text-white">{movie.cast.join(', ')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              {movie.imdbId && (
                <a
                  href={`https://www.imdb.com/title/${movie.imdbId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#F5C518] to-[#E6B800] text-black px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 cursor-pointer"
                >
                  <Play size={20} />
                  <span>IMDb дээр үзэх</span>
                  <ExternalLink size={18} />
                </a>
              )}

              {isLoggedIn && (
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl shadow-[#3B82F6]/30 cursor-pointer"
                >
                  {showReviewForm ? 'Хаах' : 'Сэтгэгдэл бичих'}
                </button>
              )}
            </div>

            {!isLoggedIn && (
              <p className="text-[#B3B3B3]">
                Сэтгэгдэл бичихийн тулд{' '}
                <button className="text-[#3B82F6] hover:underline cursor-pointer">
                  нэвтэрнэ үү
                </button>
              </p>
            )}

            {showReviewForm && isLoggedIn && (
              <ReviewForm
                onSubmit={handleSubmitReview}
                onCancel={() => setShowReviewForm(false)}
              />
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-3xl">
              Сэтгэгдэлүүд ({movie.reviews.length})
            </h2>
            <div className="text-[#B3B3B3]">
              IMDB датасетаас
            </div>
          </div>

          <div className="space-y-4">
            {movie.reviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#1A1A1A] rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#3B82F6] flex items-center justify-center text-white">
                      {review.userName.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white">{review.userName}</h3>
                        <p className="text-[#B3B3B3] text-sm">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
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
                    </div>
                    <p className="text-[#B3B3B3] leading-relaxed">
                      {review.comment}
                    </p>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-colors">
                        <ThumbsUp size={16} />
                        <span className="text-sm">Тустай ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}