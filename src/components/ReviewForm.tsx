import { useState } from 'react';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
  onCancel: () => void;
}

export function ReviewForm({ onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim()) {
      onSubmit(rating, comment);
      setRating(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#0F0F0F] rounded-2xl p-6 space-y-4 border border-white/10">
      <h3 className="text-white text-xl">Таны үнэлгээ</h3>
      
      {/* Star Rating */}
      <div>
        <label className="text-[#B3B3B3] text-sm mb-2 block">
          Үнэлгээ (1-10)
        </label>
        <div className="flex gap-1">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              onMouseEnter={() => setHoveredRating(i + 1)}
              onMouseLeave={() => setHoveredRating(0)}
              className="transition-transform hover:scale-110"
            >
              <Star
                size={24}
                className={
                  i < (hoveredRating || rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-[#B3B3B3]'
                }
              />
            </button>
          ))}
          <span className="text-white ml-3">{rating || hoveredRating || 0}/10</span>
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className="text-[#B3B3B3] text-sm mb-2 block">
          Сэтгэгдэл
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Энэ киноны талаар өөрийн бодлоо бичнэ үү..."
          rows={4}
          className="w-full bg-[#1A1A1A] text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#3B82F6] placeholder-[#B3B3B3] resize-none"
          required
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={rating === 0 || !comment.trim()}
          className="flex-1 bg-[#3B82F6] text-white py-3 rounded-xl hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Илгээх
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-[#1A1A1A] text-[#B3B3B3] rounded-xl hover:bg-[#2A2A2A] hover:text-white transition-colors"
        >
          Цуцлах
        </button>
      </div>
    </form>
  );
}
