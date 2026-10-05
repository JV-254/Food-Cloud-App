// Client/src/App.jsx
import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import CompetitorAnalysis from './pages/CompetitorAnalysis';
import ConsumerInsights from './pages/ConsumerInsights';
import DemandForecasting from './pages/DemandForecasting';
import MarketSegmentation from './pages/MarketSegmentation';
import PricingIntelligence from './pages/PricingIntelligence';
import ProductPerformance from './pages/productPerformance';
import SalesAnalytics from './pages/SalesAnalytics';
import SentimentAnalysis from './pages/SentimentAnalysis';
import Reports from './pages/Reports';
import Settings from './pages/Settings'; 
import './index.css';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); 
  const [authToken, setAuthToken] = useState(null);

  // 1. Synchronize authentication state with browser session storage on startup
  useEffect(() => {
    const savedToken = localStorage.getItem('foodcloud_token');
    if (savedToken) {
      setAuthToken(savedToken);
      setCurrentView('dashboard');
    }
  }, []);

  const handleLoginSuccess = (token, user) => {
    localStorage.setItem('foodcloud_token', token);
    if (user) {
      localStorage.setItem('foodcloud_user', JSON.stringify(user));
    }
    setAuthToken(token);
    setCurrentView('dashboard');
  };

  const handleSignOut = () => {
    localStorage.removeItem('foodcloud_token');
    localStorage.removeItem('foodcloud_user');
    setAuthToken(null);
    setCurrentView('home');
  };

  // 🛡️ IN-LINE PROTECTED ROUTE GUARD
  // If a view switcher request is made for an authenticated page but no token exists,
  // we immediately intercept the render and force them back to the login gate.
  const renderProtectedRoute = (component) => {
    const activeToken = authToken || localStorage.getItem('foodcloud_token');
    if (!activeToken) {
      // Force immediate redirect to login view if credentials are missing
      setTimeout(() => setCurrentView('login'), 0);
      return null;
    }
    return component;
  };

  return (
    <>
      {/* PUBLIC VIEWS */}
      {currentView === 'home' && (
        <Home onNavigateToLogin={() => setCurrentView('login')} />
      )}

      {currentView === 'login' && (
        <div className="relative">
          <button 
            onClick={() => setCurrentView('home')} 
            className="absolute top-6 left-6 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:bg-slate-50 transition-all cursor-pointer z-50"
          >
            ← Back to Home
          </button>
          <Login 
            onLoginSuccess={handleLoginSuccess}
            onNavigateToRegister={() => setCurrentView('register')}
          />
        </div>
      )}

      {currentView === 'register' && (
        <div className="relative">
          <button 
            onClick={() => setCurrentView('home')} 
            className="absolute top-6 left-6 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm hover:bg-slate-50 transition-all cursor-pointer z-50"
          >
            ← Back to Home
          </button>
          <Register 
            onRegisterSuccess={() => setCurrentView('login')}
            onNavigateToLogin={() => setCurrentView('login')}
          />
        </div>
      )}

      {/* AUTHENTICATED VIEWS (Fully guarded by our brand-new secure router helper) */}
      {(
        currentView === 'dashboard' || 
        currentView === 'competitors' || 
        currentView === 'insights' || 
        currentView === 'forecasting' || 
        currentView === 'segmentation' || 
        currentView === 'pricing' || 
        currentView === 'performance' || 
        currentView === 'sales' || 
        currentView === 'sentiment' || 
        currentView === 'reports' || 
        currentView === 'settings'
      ) && (
        <div className="min-h-screen flex bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          
          {/* Persistent Sidebar Navigation Panel */}
          <aside className="w-64 fixed inset-y-0 left-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-30 hidden lg:block sidebar-transition">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700">
              <h1 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 font-sans">FoodCloud Kenya</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Enterprise Hub</p>
            </div>
            
            <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-100px)]">
              {/* Tab 1: Operational Core Overview */}
              <button 
                onClick={() => setCurrentView('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'dashboard' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>📊 Dashboard Overview</span>
              </button>

              {/* Tab 2: Competitor Analytics */}
              <button 
                onClick={() => setCurrentView('competitors')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'competitors' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>🕵️ Competitors Analysis</span>
              </button>

              {/* Tab 3: Consumer Insights */}
              <button 
                onClick={() => setCurrentView('insights')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'insights' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>🗣️ Consumer Insights</span>
              </button>

              {/* Tab 4: Predictive Forecasting */}
              <button 
                onClick={() => setCurrentView('forecasting')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'forecasting' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>🔮 Demand Forecasting</span>
              </button>

              {/* Tab 5: Market Segmentation */}
              <button 
                onClick={() => setCurrentView('segmentation')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'segmentation' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>🎯 Market Segmentation</span>
              </button>

              {/* Tab 6: Pricing Intelligence */}
              <button 
                onClick={() => setCurrentView('pricing')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'pricing' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>💸 Price Intelligence</span>
              </button>

              {/* Tab 7: Product Lines Performance */}
              <button 
                onClick={() => setCurrentView('performance')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'performance' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>📦 Product Performance</span>
              </button>

              {/* Tab 8: Sales Analytics */}
              <button 
                onClick={() => setCurrentView('sales')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'sales' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>📈 Sales Analytics</span>
              </button>

              {/* Tab 9: Sentiment Analysis */}
              <button 
                onClick={() => setCurrentView('sentiment')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'sentiment' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>🧠 Sentiment Analysis</span>
              </button>

              {/* Tab 10: Reports Hub */}
              <button 
                onClick={() => setCurrentView('reports')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'reports' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>📂 Reports Hub</span>
              </button>

              {/* Tab 11: Enterprise Settings */}
              <button 
                onClick={() => setCurrentView('settings')}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  currentView === 'settings' 
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-950' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>⚙️ Portal Settings</span>
              </button>
            </nav>
          </aside>

          {/* Main Context Wrapper */}
          <div className="flex-1 lg:pl-64 flex flex-col min-w-0 relative">
            <main className="flex-1">
              {currentView === 'dashboard' && renderProtectedRoute(<Dashboard />)}
              {currentView === 'competitors' && renderProtectedRoute(<CompetitorAnalysis />)}
              {currentView === 'insights' && renderProtectedRoute(<ConsumerInsights />)}
              {currentView === 'forecasting' && renderProtectedRoute(<DemandForecasting />)}
              {currentView === 'segmentation' && renderProtectedRoute(<MarketSegmentation />)}
              {currentView === 'pricing' && renderProtectedRoute(<PricingIntelligence />)}
              {currentView === 'performance' && renderProtectedRoute(<ProductPerformance />)}
              {currentView === 'sales' && renderProtectedRoute(<SalesAnalytics />)}
              {currentView === 'sentiment' && renderProtectedRoute(<SentimentAnalysis />)}
              {currentView === 'reports' && renderProtectedRoute(<Reports />)}
              {currentView === 'settings' && renderProtectedRoute(<Settings />)}
            </main>
            
            {/* Float-Mounted Sign-out Control Anchor */}
            <button 
              onClick={handleSignOut}
              className="fixed bottom-6 right-6 bg-slate-950 text-slate-400 border border-slate-800 text-xs px-4 py-2.5 rounded-full z-50 font-semibold shadow-xl hover:text-white transition-all cursor-pointer flex items-center space-x-1"
            >
              <span>🔒 Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}