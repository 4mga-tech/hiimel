import { ImageWithFallback } from './figma/ImageWithFallback';
import { Star } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  image: string;
  rating?: number;
}

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div className="group cursor-pointer" onClick={onClick}>
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] rounded-[24px] overflow-hidden transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] border border-white/5 hover:border-[#3B82F6]/50">
        <div className="aspect-[2/3] overflow-hidden relative">
          <ImageWithFallback
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          {movie.rating && (
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-white text-sm">{movie.rating}</span>
            </div>
          )}
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
            <span className="text-white text-sm px-4 py-2 bg-[#3B82F6] rounded-full shadow-lg">
              Дэлгэрэнгүй үзэх
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-white text-lg line-clamp-2">
            {movie.title}
          </h3>
        </div>
      </div>
    </div>
  );
}