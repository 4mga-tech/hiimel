import { useState, useEffect } from 'react';
import { User, LogOut, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isLoggedIn: boolean;
  userName?: string;
  onLogout: () => void;
}

export function Header({ currentPage, onNavigate, isLoggedIn, userName, onLogout }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Navigate and scroll to top
  const handleNavigate = (page: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const navItems = isLoggedIn 
    ? [
        { id: 'home', label: 'Нүүр' },
        { id: 'suggest', label: 'Санал болгох' },
        { id: 'dashboard', label: 'Хяналт' }
      ]
    : [
        { id: 'home', label: 'Нүүр' },
        { id: 'suggest', label: 'Санал болгох' },
        { id: 'login', label: 'Нэвтрэх' }
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="bg-gradient-to-r from-[#0F0F0F]/95 via-[#1A1A1A]/95 to-[#0F0F0F]/95 backdrop-blur-lg border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => handleNavigate('home')}
              className="text-white hover:text-[#3B82F6] transition-all duration-300 text-lg sm:text-xl cursor-pointer hover:scale-105 font-semibold"
            >
              <span className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] bg-clip-text text-transparent">AI</span> bie daalt
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`text-base lg:text-lg transition-all duration-300 cursor-pointer relative group ${
                    currentPage === item.id
                      ? 'text-white'
                      : 'text-[#B3B3B3] hover:text-white'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] transition-transform duration-300 ${
                    currentPage === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </button>
              ))}
              
              {isLoggedIn && (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 text-[#B3B3B3] hover:text-white transition-all duration-300 cursor-pointer bg-white/5 px-4 py-2 rounded-full hover:bg-white/10"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <span className="hidden lg:inline">{userName || 'Хэрэглэгч'}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] border border-white/10 rounded-xl overflow-hidden shadow-xl animate-in slide-in-from-top-2 duration-200">
                      <button
                        onClick={() => {
                          handleNavigate('dashboard');
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-[#B3B3B3] hover:text-white hover:bg-white/5 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <User size={18} />
                        Хяналтын самбар
                      </button>
                      <button
                        onClick={() => {
                          onLogout();
                          setShowUserMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut size={18} />
                        Гарах
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={`text-left px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      currentPage === item.id
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-[#3B82F6]/30'
                        : 'text-[#B3B3B3] hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
                
                {isLoggedIn && (
                  <>
                    <div className="border-t border-white/10 my-2"></div>
                    <div className="px-4 py-2 text-[#B3B3B3] flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full flex items-center justify-center">
                        <User size={16} className="text-white" />
                      </div>
                      <span>{userName || 'Хэрэглэгч'}</span>
                    </div>
                    <button
                      onClick={() => {
                        onLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="text-left px-4 py-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut size={18} />
                      Гарах
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}