import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, RefreshCw, PhoneCall, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-welcome',
      sender: 'bot',
      content: 'Hello! Welcome to Clerivex support. I am Clerivex Bot. How can I help you with your office supplies or corporate procurement needs today?',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessageTime = new Date();
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: input,
      timestamp: userMessageTime
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');
    setIsTyping(true);

    try {
      // Post message to Express API proxy endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: newUserMessage.content }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('API server unavailable');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          content: data.reply || "I am here to assist. Please let me know how I can find your office paper or catalog items.",
          timestamp: new Date()
        }
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fail gracefully with a helpful fallback
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot-err-${Date.now()}`,
            sender: 'bot',
            content: "I'm having trouble reaching our secure database. For urgent queries, please call us immediately at 706-300-0342 or email deshunrupert74@gmail.com.",
            timestamp: new Date()
          }
        ]);
      }, 800);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'm-welcome',
        sender: 'bot',
        content: 'Hello! Welcome to Clerivex support. How can I help you with our premium products or deliveries?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans" id="clerivex-chat-widget">
      {/* Mini Toggle Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl flex items-center justify-center cursor-pointer border border-slate-200/20 hover:scale-105 active:scale-95 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          layoutId="chat-button"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-400 rounded-full border border-blue-600"></span>
          </div>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 font-semibold text-sm pl-0 group-hover:pl-2">
            Chat
          </span>
        </motion.button>
      )}

      {/* Main Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-[360px] sm:w-[380px] h-[500px] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden text-slate-800"
          >
            {/* Header */}
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5 font-bold" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white flex items-center gap-1.5 leading-tight">
                    Clerivex AI Support
                  </h3>
                  <span className="text-[10px] text-blue-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Online Support Broker
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title="Clear chat records"
                  className="p-1 hover:bg-white/10 rounded transition text-white/60 hover:text-white"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/10 rounded transition text-white/60 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-slate-50 px-4 py-2 border-b border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
                706-300-0342
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                deshunrupert74@gmail.com
              </span>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/70 shadow-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                    <span className={`block text-[9px] text-right mt-1 opacity-60 ${msg.sender === 'user' ? 'text-blue-105' : 'text-slate-400'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing simulation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-800 rounded-xl rounded-tl-none px-3.5 py-3 border border-slate-200/70 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick buttons */}
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setInput("What is your phone number?")}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-250 border border-slate-200/60 rounded-full text-slate-705 transition cursor-pointer"
              >
                📞 Contact Phone
              </button>
              <button
                onClick={() => setInput("Do you offer bulk delivery discounts?")}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-250 border border-slate-200/60 rounded-full text-slate-705 transition cursor-pointer"
              >
                📦 Bulk orders
              </button>
              <button
                onClick={() => setInput("Where are you located?")}
                className="whitespace-nowrap px-2.5 py-1 text-[11px] bg-slate-100 hover:bg-slate-250 border border-slate-200/60 rounded-full text-slate-705 transition cursor-pointer"
              >
                📍 Store Location
              </button>
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Clerivex AI Support..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white hover:bg-blue-700 p-2.5 rounded-xl flex items-center justify-center transition cursor-pointer"
                disabled={isTyping}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
