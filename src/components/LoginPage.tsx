import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToRegister: () => void; // 🔥 register рүү шилжүүлэх
}

export function LoginPage({ onLogin, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method:"POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({email, password})
      });

      if(!res.ok){
        const data = await res.json();
        setError(data.detail);
        return;
      }

      onLogin();
    } catch (err) {
      setError("servertei holbogdohgui baina");
    }
  };

  return (
    <section className="px-8 pt-32 pb-24 md:px-16 lg:px-24 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">

        <div className="bg-[#1A1A1A] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">

          <div className="text-center mb-8">
            <h1 className="text-white text-3xl md:text-4xl mb-3">Нэвтрэх</h1>
            <p className="text-[#B3B3B3]">Таны дансанд нэвтрэх</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-white mb-2">
                Имэйл хаяг
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0F0F0F] text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-white mb-2">
                Нууц үг
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]" size={20} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0F0F0F] text-white pl-12 pr-12 py-3 rounded-xl outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]"
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#3B82F6] text-white py-3 rounded-xl mt-6"
            >
              Нэвтрэх
            </button>

            {/* 🔥 Register button */}
            <p className="text-center text-[#B3B3B3] mt-4 text-sm">
              Данс байхгүй юу?
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#3B82F6] ml-1 hover:underline"
              >
                Бүртгүүлэх
              </button>
            </p>

          </form>
        </div>
      </div>
    </section>
  );
}
