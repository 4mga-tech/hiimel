import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password})
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.detail);
        return;
      }

      setSuccess("Бүртгэл амжилттай! Та нэвтэрч болно.");
      setError("");
    } 
    catch (e) {
      setError("Сервертэй холбогдох боломжгүй");
    }
  };

  return (
    <section className="px-8 pt-32 pb-24 md:px-16 lg:px-24 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">

        <div className="bg-[#1A1A1A] rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10">

          <div className="text-center mb-8">
            <h1 className="text-white text-3xl md:text-4xl mb-3">Бүртгүүлэх</h1>
            <p className="text-[#B3B3B3]">Шинэ данс үүсгэх</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-white mb-2">Имэйл хаяг</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]" size={20}/>
                <input
                  type="email"
                  className="w-full bg-[#0F0F0F] text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-[#3B82F6]"
                  placeholder="email@example.com"
                  required
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white mb-2">Нууц үг</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]" size={20}/>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full bg-[#0F0F0F] text-white pl-12 pr-12 py-3 rounded-xl focus:ring-2 focus:ring-[#3B82F6]"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3B3B3]"
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            <button
              type="submit"
              className="w-full bg-[#3B82F6] text-white py-3 rounded-xl mt-6"
            >
              Бүртгүүлэх
            </button>

            {/* Back to login */}
            <p className="text-center text-[#B3B3B3] mt-4 text-sm">
              Хаяг байгаа юу?
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#3B82F6] ml-1 hover:underline"
              >
                Нэвтрэх
              </button>
            </p>

          </form>
        </div>

      </div>
    </section>
  );
}
