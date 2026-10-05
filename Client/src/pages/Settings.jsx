import React, { useState, useEffect } from 'react';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Setting Parameter States
  const [appName, setAppName] = useState('FoodCloud Kenya ');
  const [defaultCurrency, setDefaultCurrency] = useState('KES');
  const [sessionTimeout, setSessionTimeout] = useState('60');
  const [dbHost, setDbHost] = useState('localhost');
  const [dbPort, setDbPort] = useState('3306');
  const [dbUser, setDbUser] = useState('root');
  const [dbName, setDbName] = useState('foodcloud_db');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    alert('System settings committed successfully to memory registries!');
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        INITIALIZING ENTERPRISE SYSTEM CONFIGURATION NODES...
      </div>
    );
  }

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">Enterprise Settings Console</h2>
            <p className="text-sm text-slate-500">Configure global platform metrics, authorization thresholds, and active database connection strings.</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Control Sub-Tabs */}
        <div className="flex space-x-2 border-b border-slate-200 pb-2">
          {['general', 'security', 'database'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-xs font-bold uppercase rounded-xl transition-all cursor-pointer ${
                activeTab === tab 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab} Settings
            </button>
          ))}
        </div>

        {/* Dynamic Settings Content Panel */}
        <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">General Portal Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Platform Brand Header Name</label>
                  <input 
                    type="text" 
                    value={appName} 
                    onChange={(e) => setAppName(e.target.value)} 
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Default Valuation Currency</label>
                  <select 
                    value={defaultCurrency} 
                    onChange={(e) => setDefaultCurrency(e.target.value)} 
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none"
                  >
                    <option value="KES">Kenyan Shilling (KSh)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="EUR">Euro (€)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Security & Authentication Control</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Inactivity Session Timeout (Minutes)</label>
                  <input 
                    type="number" 
                    value={sessionTimeout} 
                    onChange={(e) => setSessionTimeout(e.target.value)} 
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Security Encryption Mode</label>
                  <select className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none" disabled>
                    <option value="JWT">JSON Web Token (HMAC SHA-256)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'database' && (
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Database Node Connection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">MySQL Database Server Host</label>
                  <input 
                    type="text" 
                    value={dbHost} 
                    onChange={(e) => setDbHost(e.target.value)} 
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Port Specification</label>
                  <input 
                    type="text" 
                    value={dbPort} 
                    onChange={(e) => setDbPort(e.target.value)} 
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Database Schema Name</label>
                  <input 
                    type="text" 
                    value={dbName} 
                    onChange={(e) => setDbName(e.target.value)} 
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none" 
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Username Access Credentials</label>
                  <input 
                    type="text" 
                    value={dbUser} 
                    onChange={(e) => setDbUser(e.target.value)} 
                    className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Trigger Line */}
          <div className="border-t border-slate-100 pt-4 flex justify-end">
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors cursor-pointer"
            >
              Commit Configuration
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}