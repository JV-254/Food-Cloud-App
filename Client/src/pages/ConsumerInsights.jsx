import React, { useState, useEffect } from 'react';

export default function ConsumerInsights() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [insights, setInsights] = useState([]);
  const [themes, setThemes] = useState([]);

  // Form Fields State
  const [severity, setSeverity] = useState('Medium');
  const [type, setType] = useState('sentiment');
  const [message, setMessage] = useState('');
  const [action, setAction] = useState('');

  const fetchInsightsData = () => {
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
          setInsights(json.insights || []);
          setThemes(json.themes || []);
        }
      })
      .catch((err) => console.error("Error connecting to consumer insights pipeline:", err));
  };

  useEffect(() => {
    fetchInsightsData().finally(() => setLoading(false));
  }, []);

  const handleAddInsight = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token

    fetch('http://localhost:5000/api/insights', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
      },
      body: JSON.stringify({ severity, type, message, action })
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        setMessage('');
        setAction('');
        fetchInsightsData();
      }
    });
  };

  const handleDismiss = (id) => {
    const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token

    fetch(`http://localhost:5000/api/insights/${id}`, { 
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
      }
    })
      .then(() => fetchInsightsData());
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        RETRIEVING CONSUMER EMOTION AND METRIC SPACES...
      </div>
    );
  }

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title Bar */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">Consumer Insights Portal</h2>
            <p className="text-sm text-slate-500">Live public sentiment patterns and emerging product category demands.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 animate-pulse">
              ● Analysis Online
            </span>
          </div>
        </div>

        {/* Form to submit fresh feedback / alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Log Real-Time Consumer Observation</h3>
          
          <form onSubmit={handleAddInsight} className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-50/60 p-4 rounded-xl border border-slate-100">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Severity</label>
              <select value={severity} onChange={e => setSeverity(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none">
                <option value="High">🔴 High Severity</option>
                <option value="Medium">🟡 Medium Severity</option>
                <option value="Low">🟢 Low Severity</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Category Type</label>
              <select value={type} onChange={e => setType(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none">
                <option value="demand">Demand Shift</option>
                <option value="sentiment">Sentiment Alert</option>
                <option value="competitor">Competitor Activity</option>
                <option value="trend">R&D Trend</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1 md:col-span-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Observation Details</label>
              <input type="text" placeholder="Describe feedback pattern..." value={message} onChange={e => setMessage(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Recommended Action</label>
              <input type="text" placeholder="e.g. Optimize Supply" value={action} onChange={e => setAction(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none" />
            </div>

            <div className="flex items-end md:col-span-5">
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs h-10 transition-colors shadow-sm cursor-pointer">
                + Dispatch Actionable Observation
              </button>
            </div>
          </form>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Live AI & Feedback alerts */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Live Action Alerts</h3>
            
            <div className="space-y-3">
              {insights.length === 0 ? (
                <div className="bg-white p-6 text-center text-sm text-slate-400 rounded-2xl border border-slate-100 italic">
                  No active observation alerts loaded. Use the panel above to dispatch items.
                </div>
              ) : (
                insights.map((ins) => (
                  <div key={ins.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-start justify-between space-x-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase ${
                          ins.severity === 'High' ? 'bg-red-50 text-red-700 border border-red-100' :
                          ins.severity === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        }`}>
                          {ins.severity} Priority
                        </span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{ins.type}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed">{ins.message}</p>
                      <div className="pt-2 text-xs font-medium text-slate-500">
                        💡 Recommended Strategy: <span className="text-emerald-600 font-bold underline">{ins.action}</span>
                      </div>
                    </div>
                    <button onClick={() => handleDismiss(ins.id)} className="text-xs text-slate-400 hover:text-red-500 font-semibold cursor-pointer">
                      Resolve
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Column: Key Sentiment Metric Themes */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-6 h-fit">
            <div>
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Category Sentiment Health</h3>
              <p className="text-xs text-slate-500">Consumer sentiment tracking across essential parameters.</p>
            </div>

            <div className="space-y-5">
              {themes.length === 0 ? (
                <div className="text-center text-xs text-slate-400 italic py-4">
                  No tracking parameters initialized.
                </div>
              ) : (
                themes.map((t) => (
                  <div key={t.id} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-900">{t.theme}</span>
                      <span className="text-emerald-600 font-bold">{t.positive}% Positive</span>
                    </div>
                    {/* Segmented Percentage Progress Bars */}
                    <div className="h-2.5 w-full flex rounded-full overflow-hidden bg-slate-100">
                      <div style={{ width: `${t.positive}%` }} className="bg-emerald-500 transition-all duration-500" title="Positive"></div>
                      <div style={{ width: `${t.neutral}%` }} className="bg-amber-400 transition-all duration-500" title="Neutral"></div>
                      <div style={{ width: `${t.negative}%` }} className="bg-red-500 transition-all duration-500" title="Negative"></div>
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

        </div>

      </div>
    </div>
  );
}