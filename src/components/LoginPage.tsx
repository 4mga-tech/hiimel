import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void; // no need for email/name
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Only allow this one account
    if (email === 'amgalanbaatar@gmail.com' && password === 'a') {
      localStorage.setItem('isLoggedIn', 'true'); // optional persistence
      onLogin();
    } else {
      setError('Имэйл эсвэл нууц үг буруу байна');
    }
  };

  return (
    <section className="px-8 pt-32 pb-24 md:px-16 lg:px-24 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        {/* Card */}
        <div className="bg-[#1A1A1A] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-white text-3xl md:text-4xl mb-3">
              Нэвтрэх
            </h1>
            <p className="text-[#B3B3B3]">Таны дансанд нэвтрэх</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Имэйл хаяг
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]"
                  size={20}
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-[#0F0F0F] text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#3B82F6] placeholder-[#B3B3B3]/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-white mb-2">
                Нууц үг
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]"
                  size={20}
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0F0F0F] text-white pl-12 pr-12 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#3B82F6] placeholder-[#B3B3B3]/50 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#3B82F6] text-white py-3 rounded-xl hover:bg-[#2563EB] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] mt-6"
            >
              Нэвтрэх
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
