import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

interface ChatBotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBotModal({ isOpen, onClose }: ChatBotModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Сайн байна уу! Би таны кино сонголтод туслах хиймэл оюун ухааны туслах. Та ямар төрлийн кино үзэхийг хүсэж байна вэ?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Send message to backend
  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text) return;

    const newUserMsg: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue("");
    setIsSending(true);

    try {
      let endpoint = "/chat-ai";

      // If message is about movie recommendations
      if (
        text.toLowerCase().includes("recommend") ||
        text.toLowerCase().includes("жанр") ||
        text.toLowerCase().includes("төрөл")
      ) {
        endpoint = "/ask-ai";
      }

      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      let botText = "";

      // If /ask-ai returns movie list
      if (Array.isArray(data.answer)) {
        botText = data.answer
          .map((m: any) => `🎥 ${m.title} (${m.rating}⭐)\n${m.imdb_url}`)
          .join("\n\n");
      } else {
        botText = data.answer || data.response || "AI хариу ирсэнгүй.";
      }

      const newBotMsg: Message = {
        id: Date.now() + 1,
        text: botText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: Message = {
        id: Date.now() + 1,
        text: "⚠️ Сервертэй холбогдож чадсангүй.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    }

    setIsSending(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="bg-gradient-to-b from-[#1A1A1A] to-[#0F0F0F] rounded-2xl w-full max-w-2xl h-[600px] flex flex-col shadow-2xl border border-white/10 animate-in slide-in-from-bottom-4 duration-300">
        
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-[#3B82F6]/10 to-transparent">
          <div>
            <h3 className="text-white text-xl">🤖 Кино санал болгогч</h3>
            <p className="text-[#B3B3B3] text-sm mt-1">Хиймэл оюун ухааны туслах</p>
          </div>
          <button onClick={onClose} className="text-[#B3B3B3] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg cursor-pointer">
            <X size={24} />
          </button>
        </div>

        {/* MESSAGES */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-4"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 whitespace-pre-wrap ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white shadow-lg shadow-[#3B82F6]/30'
                    : 'bg-[#2A2A2A] text-white border border-white/5'
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-60 mt-1 text-right">
                  {message.timestamp.toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT AREA */}
        <div className="p-6 border-t border-white/10 bg-[#0F0F0F]/50">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              disabled={isSending}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Мессеж бичих..."
              className="flex-1 bg-[#2A2A2A] text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#3B82F6] placeholder-[#B3B3B3] border border-white/5 transition-all disabled:opacity-60"
            />
            <button
              onClick={handleSend}
              disabled={isSending}
              className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#3B82F6]/30 cursor-pointer disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
