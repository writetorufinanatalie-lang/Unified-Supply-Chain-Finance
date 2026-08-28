import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ExternalLink,
  Sliders,
  ShieldAlert,
} from 'lucide-react';
import { useAppStore } from '../../stores/useAppStore';
import { matchCopilotQuery } from '../../services/mockData';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedAction?: string;
  relatedSupplierId?: string;
  timestamp: string;
}

export const CopilotPanel: React.FC = () => {
  const navigate = useNavigate();
  const {
    copilotOpen,
    setCopilotOpen,
    copilotInitialQuery,
    selectSupplier,
  } = useAppStore();

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello, I am your **ChainShield AI Financial Analyst**. I actively monitor 18 supply chain nodes, real-time port telemetry, dynamic financing spreads, and deep-tier risk propagation. How can I assist your treasury team today?",
      recommendedAction: "Select a suggested telemetry query below or ask any question about portfolio exposure.",
      timestamp: 'Just now',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedChips = [
    "Which suppliers are currently high risk?",
    "Why is ABC Components risky?",
    "How much financing is exposed to high-risk suppliers?",
    "Which Tier-3 supplier is the biggest single point of failure?",
    "What happens if the Shanghai route is disrupted?",
    "Why did the financing rate change?",
    "Which suppliers should we monitor?",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (copilotOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [copilotOpen, messages]);

  // Handle external query triggers
  useEffect(() => {
    if (copilotInitialQuery) {
      handleSendMessage(copilotInitialQuery);
    }
  }, [copilotInitialQuery]);

  const handleSendMessage = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    // Simulate realistic analyst reasoning latency
    setTimeout(() => {
      const match = matchCopilotQuery(trimmed);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: match.answer,
        recommendedAction: match.recommendedAction,
        relatedSupplierId: match.relatedSupplierId,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 450);
  };

  if (!copilotOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {/* Backdrop overlay */}
      <div
        onClick={() => setCopilotOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-200 pointer-events-auto"
      />

      {/* Slide-in Panel */}
      <div className="absolute top-0 right-0 bottom-0 w-full max-w-[420px] bg-bg-surface border-l border-border-custom shadow-2xl flex flex-col pointer-events-auto animate-in slide-in-from-right duration-200 z-10">
        {/* Header */}
        <div className="h-14 px-4 border-b border-border-custom flex items-center justify-between bg-bg-surface-2/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shadow-glow-accent">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                <span>ChainShield Copilot</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-accent/20 text-accent font-mono border border-accent/30">
                  ONLINE
                </span>
              </div>
              <p className="text-[10px] text-text-muted">
                Financial Risk Intelligence & Copilot
              </p>
            </div>
          </div>
          <button
            onClick={() => setCopilotOpen(false)}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Suggested Question Chips (Scrollable strip) */}
        <div className="p-3 bg-bg-base/40 border-b border-border-custom">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-2 flex items-center gap-1">
            <Bot className="w-3 h-3 text-accent" />
            <span>Suggested Inquiries</span>
          </div>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
            {suggestedChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(chip)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-bg-surface-2 border border-border-custom text-text-secondary hover:text-accent hover:border-accent/40 text-left transition-all truncate max-w-full"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-accent text-bg-base font-medium rounded-tr-none'
                    : 'bg-bg-surface-2 border border-border-custom text-text-primary rounded-tl-none space-y-2'
                }`}
              >
                {/* Parse simple markdown bold tags */}
                <div
                  className="space-y-1.5"
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/\n/g, '<br/>'),
                  }}
                />

                {msg.recommendedAction && (
                  <div className="mt-2.5 pt-2 border-t border-border-custom/80 bg-bg-base/40 -mx-1.5 -mb-1.5 p-2.5 rounded-b-lg">
                    <div className="text-[11px] font-bold text-accent uppercase tracking-wider mb-0.5 flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      <span>Recommended Action</span>
                    </div>
                    <p className="text-[11px] text-text-secondary">
                      {msg.recommendedAction}
                    </p>

                    {/* Actionable buttons inside AI bubble */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.relatedSupplierId && (
                        <button
                          onClick={() => {
                            selectSupplier(msg.relatedSupplierId!);
                            setCopilotOpen(false);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-accent/20 hover:bg-accent/30 text-accent font-semibold text-[11px] transition-colors"
                        >
                          <span>Inspect {msg.relatedSupplierId} Profile</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                      {msg.text.toLowerCase().includes('shanghai') && (
                        <button
                          onClick={() => {
                            navigate('/simulator');
                            setCopilotOpen(false);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-bg-surface border border-border-custom hover:border-accent text-text-primary text-[11px] font-medium transition-colors"
                        >
                          <Sliders className="w-3 h-3 text-accent" />
                          <span>Launch Scenario Simulator</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <div className="text-[10px] text-text-muted text-right opacity-70">
                  {msg.timestamp}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-md bg-text-secondary/20 border border-text-secondary/40 flex items-center justify-center text-text-primary shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-text-muted text-xs italic">
              <div className="w-7 h-7 rounded-md bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
              </div>
              <span className="animate-pulse">Synthesizing supply chain risk telemetry...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 border-t border-border-custom bg-bg-surface-2/90">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask Copilot about risk, financing rates, suppliers..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 bg-bg-base border border-border-custom rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isTyping}
              className="p-2 rounded-lg bg-accent text-bg-base font-semibold hover:bg-accent-hover disabled:opacity-40 disabled:hover:bg-accent transition-colors shrink-0 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-1.5 text-[10px] text-center text-text-muted">
            ChainShield AI v2.4 • Grounded in real-time mock telemetry
          </div>
        </div>
      </div>
    </div>
  );
};
