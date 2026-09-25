import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Terminal, RefreshCw, Key, ShieldCheck, Check } from 'lucide-react';
import { sendMessage } from '../services/chatbot';

const suggestedPrompts = [
  "Arif ke projects ke baare mein batao",
  "How to contact Arif directly?",
  "Tell me about his Computer Vision projects",
  "What is his education & college?",
  "Can Arif build RAG and IoT systems?",
];

export default function ChatbotSection() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Namaste! Main Arif Shekh ka personal AI Assistant hoon. Arif Theem College of Engineering mein AI & ML ka final year student hai. Aap mujhse uske real AI/ML, Computer Vision, IoT projects, skills ya direct contact ke baare mein kuch bhi pooch sakte ho!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : input;
    if (!query || !query.trim() || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessage(query.trim(), geminiKey);
      const botMsg = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: response.reply,
        source: response.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: "Error processing query. Please check your network or try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'assistant',
        text: "Chat refreshed. Arif ke baare mein aap kya jaanna chahte hain?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <section id="ai-assistant" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 bg-[#030712]/60">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3">
            <Sparkles size={13} />
            <span>04 // ASK MY AI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Talk to Arif's AI Assistant
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-3">
            Ask about my real skills, projects, computer vision algorithms, IoT prototypes, education, or contact details.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mt-4" />
        </div>

        {/* Chat Interface Container */}
        <div className="glass-panel rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 overflow-hidden flex flex-col h-[600px]">
          {/* Top Chat Header */}
          <div className="p-4 sm:p-5 bg-slate-900/90 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-glow-cyan">
                <Bot size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Arif Shekh Portfolio AI
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  {geminiKey ? (
                    <span className="text-cyan-400 font-semibold">● LIVE GEMINI 1.5 PRO ACTIVE</span>
                  ) : (
                    <span className="text-emerald-400">● REAL-TIME KNOWLEDGE ENGINE ACTIVE</span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowKeyInput(!showKeyInput)}
                title="Connect custom Gemini API key for unrestricted live LLM generation"
                className={`p-2 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all ${
                  geminiKey
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                    : 'bg-slate-800/80 border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                <Key size={14} />
                <span className="hidden sm:inline">{geminiKey ? 'Gemini Linked' : 'Connect Gemini API'}</span>
              </button>

              <button
                onClick={handleClearChat}
                title="Reset conversation"
                className="p-2 rounded-xl bg-slate-800/80 border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <RefreshCw size={15} />
              </button>
            </div>
          </div>

          {/* Optional Gemini API Key Drawer */}
          <AnimatePresence>
            {showKeyInput && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="p-3 bg-slate-950 border-b border-cyan-500/20 flex flex-col sm:flex-row items-center gap-2"
              >
                <input
                  type="password"
                  placeholder="Paste your Google Gemini API Key here (Optional)..."
                  value={geminiKey}
                  onChange={(e) => setGeminiKey(e.target.value)}
                  className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono w-full"
                />
                <button
                  onClick={() => setShowKeyInput(false)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono uppercase flex items-center gap-1 w-full sm:w-auto justify-center"
                >
                  <Check size={14} />
                  <span>Save Key</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-950/60">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[88%] sm:max-w-[80%] ${
                    isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs ${
                      isUser
                        ? 'bg-purple-600 text-white shadow-glow-purple'
                        : 'bg-slate-900 border border-cyan-500/30 text-cyan-400 shadow-glow-cyan'
                    }`}
                  >
                    {isUser ? <User size={15} /> : <Bot size={15} />}
                  </div>

                  <div className="flex flex-col">
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                          : 'bg-slate-900/90 border border-white/10 text-slate-200 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 mt-1 px-1 flex items-center justify-between">
                      <span>{msg.timestamp}</span>
                      {msg.source && (
                        <span className="text-cyan-400/80 uppercase text-[9px]">
                          [{msg.source}]
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex gap-3 max-w-[75%] mr-auto items-center">
                <div className="w-8 h-8 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                  <Bot size={15} />
                </div>
                <div className="p-3.5 rounded-2xl rounded-tl-none bg-slate-900/90 border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Example Quick Prompts */}
          <div className="px-4 py-2.5 bg-slate-900/80 border-t border-white/5 overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] font-mono text-slate-500 uppercase flex-shrink-0">
              SUGGESTED:
            </span>
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                disabled={isLoading}
                className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-700/90 border border-white/5 hover:border-cyan-500/30 text-[11px] font-mono text-slate-300 hover:text-cyan-300 transition-colors flex-shrink-0 disabled:opacity-50"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-slate-900/95 border-t border-white/10 flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask anything in English or Hindi (e.g., Arif ke projects, college, email...)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-slate-950 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-3 text-xs sm:text-sm font-sans text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-all disabled:opacity-50"
            />

            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              aria-label="Send Message to AI"
              className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold disabled:opacity-40 disabled:cursor-not-allowed shadow-glow-cyan transition-all flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
