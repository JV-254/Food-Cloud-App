import React, { useState, useEffect } from 'react';

export default function SentimentAnalysis() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [themes, setThemes] = useState([]);
  
  // Custom mock verbatim feed with various retail channels in Kenya
  const [verbatims, setVerbatims] = useState([
    {
      id: 1,
      source: "Modern Trade Buyer (Mombasa)",
      sentiment: "Negative",
      text: "The seals on Alpha Yoghurt 500ML leaks consistently under standard distribution transport constraints to Mombasa."
    },
    {
      id: 2,
      source: "Supermarket Hub (Nairobi)",
      sentiment: "Positive",
      text: "Excellent velocity on the Low-Sugar line in Nairobi. Reordering frequency increased by 15%."
    },
    {
      id: 3,
      source: "Wholesale Distributor (Eldoret)",
      sentiment: "Neutral",
      text: "Maize meal inventory levels are stable. Wholesale price adjustments are keeping volumes consistent with last month."
    }
  ]);

  const fetchSentimentThemes = () => {
    const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token

    return fetch('http://localhost:5000/api/insights', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
      }
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setThemes(json.themes || []);
        }
      })
      .catch((err) => console.error("Error connecting to sentiment themes pipeline:", err));
  };

  useEffect(() => {
    fetchSentimentThemes().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        RETRIEVING NLP TEXT ANALYSIS VECTORS...
      </div>
    );
  }

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title Bar */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">AI-Powered NLP Sentiment Terminal</h2>
            <p className="text-sm text-slate-500">Natural Language Processing on consumer feedback matrices across trade regions.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 animate-pulse">
              ● NLP Core Online
            </span>
          </div>
        </div>

        {/* NLP Display Segment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* NLP Text Analysis Vectors Panel */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-1">NLP Text Analysis Vectors</h3>
              <p className="text-xs text-slate-500">Real-time keyword cluster analysis mapped from survey, retail, and digital channels.</p>
            </div>

            <div className="space-y-6">
              {themes.length === 0 ? (
                <div className="py-8 text-center text-sm text-slate-400 italic">
                  No sentiment themes found in database registry.
                </div>
              ) : (
                themes.map((t) => (
                  <div key={t.id} className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-900">{t.theme}</span>
                      <span className="text-emerald-600 font-bold">{t.positive}% Positive</span>
                    </div>
                    {/* Stacked Sentiment Percentage Bar */}
                    <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${t.positive}%` }} title={`Positive: ${t.positive}%`}></div>
                      <div className="bg-amber-400 h-full transition-all duration-500" style={{ width: `${t.neutral}%` }} title={`Neutral: ${t.neutral}%`}></div>
                      <div className="bg-red-500 h-full transition-all duration-500" style={{ width: `${t.negative}%` }} title={`Negative: ${t.negative}%`}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                      <span>POS: {t.positive}%</span>
                      <span>NEU: {t.neutral}%</span>
                      <span>NEG: {t.negative}%</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Verbatim Feedback Side Panel */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Verbatim Retail Feed Signals</h3>
            
            <div className="space-y-3">
              {verbatims.map((v) => (
                <div 
                  key={v.id} 
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    v.sentiment === 'Positive' ? 'bg-emerald-50/50 border-emerald-100/70 text-emerald-900' :
                    v.sentiment === 'Negative' ? 'bg-red-50/50 border-red-100/70 text-red-900' :
                    'bg-slate-50/70 border-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center font-bold">
                    <span className="text-slate-500">{v.source}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] uppercase tracking-wider ${
                      v.sentiment === 'Positive' ? 'bg-emerald-100 text-emerald-800' :
                      v.sentiment === 'Negative' ? 'bg-red-100 text-red-800' :
                      'bg-slate-200 text-slate-700'
                    }`}>
                      {v.sentiment}
                    </span>
                  </div>
                  <p className="leading-relaxed font-medium italic">"{v.text}"</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}