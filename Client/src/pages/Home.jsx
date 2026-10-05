import React from 'react';

export default function Home({ onNavigateToLogin }) {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen transition-colors duration-200 font-sans">
      {/* Nav Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-600 text-white p-2 rounded-lg font-bold text-xl flex items-center justify-center w-10 h-10">F</div>
            <span className="text-xl font-bold tracking-tight text-slate-800">FoodCloudKenyaMarket <span className="text-emerald-600">Intel</span></span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-emerald-600 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-emerald-600 transition-colors">Solutions</a>
            <a href="#workflow" className="hover:text-emerald-600 transition-colors">How It Works</a>
            
            {/* Added onClick to switch to Login View */}
            <button 
              onClick={onNavigateToLogin} 
              className="hover:text-emerald-600 transition-colors bg-transparent border-none font-medium cursor-pointer text-sm"
            >
              Sign In
            </button>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Added onClick to switch to Login View */}
            <button 
              onClick={onNavigateToLogin} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="max-w-7xl mx-auto px-6 pt-16 pb-20 text-center md:text-left md:flex md:items-center md:space-x-12">
          <div className="md:w-1/2 space-y-6">
            <span className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full">
              <i className="fa-solid fa-sparkles mr-1"></i> <span>Enterprise Market Intelligence Platform</span>
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-tight">
              Market Intelligence for Smarter <span className="text-emerald-600">Food Manufacturing</span> Decisions.
            </h1>
            <p className="text-lg text-slate-600 max-w-xl">
              Transform fragmented modern and traditional trade grocery data into actionable signals. Forecast raw demand, monitor competitors' price actions, optimize trade spend, and curb inventory write-offs across East Africa.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <button 
                onClick={onNavigateToLogin}
                className="w-full sm:w-auto text-center bg-slate-900 hover:bg-slate-800 text-white text-base font-semibold px-8 py-3.5 rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Request a Live Demo
              </button>
              <button 
                onClick={onNavigateToLogin}
                className="w-full sm:w-auto text-center bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 text-base font-semibold px-8 py-3.5 rounded-xl shadow-sm transition-all cursor-pointer"
              >
                Explore Sandbox Dashboard
              </button>
            </div>
          </div>

          <div className="mt-12 md:mt-0 md:w-1/2 bg-white rounded-2xl shadow-xl p-6 border border-slate-100">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex space-x-2"><span className="w-3 h-3 rounded-full bg-red-400"></span><span className="w-3 h-3 rounded-full bg-yellow-400"></span><span className="w-3 h-3 rounded-full bg-green-400"></span></div>
              <span className="text-xs text-slate-400">Live Workspace </span>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-slate-100 rounded animate-pulse w-1/3"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-20 bg-slate-50 border border-slate-100 rounded-xl p-3"><div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div><div className="h-6 bg-emerald-100 rounded w-1/2"></div></div>
                <div className="h-20 bg-slate-50 border border-slate-100 rounded-xl p-3"><div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div><div className="h-6 bg-blue-100 rounded w-1/2"></div></div>
                <div className="h-20 bg-slate-50 border border-slate-100 rounded-xl p-3"><div className="h-3 bg-slate-200 rounded w-2/3 mb-2"></div><div className="h-6 bg-amber-100 rounded w-1/2"></div></div>
              </div>
              <div className="h-44 bg-slate-50 border border-slate-100 rounded-xl flex items-end p-4 space-x-4">
                <div className="w-full bg-emerald-500 rounded-t h-24"></div>
                <div className="w-full bg-emerald-500 rounded-t h-36"></div>
                <div className="w-full bg-emerald-600 rounded-t h-28"></div>
                <div className="w-full bg-slate-300 rounded-t h-16"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Panel */}
        <section className="bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div><p className="text-4xl font-bold text-emerald-400">250+</p><p className="text-sm text-slate-400 mt-1">Market Indicators Tracked</p></div>
            <div><p className="text-4xl font-bold text-emerald-400">40%</p><p className="text-sm text-slate-400 mt-1">Faster Go-to-Market</p></div>
            <div><p className="text-4xl font-bold text-emerald-400">30%</p><p className="text-sm text-slate-400 mt-1">Reduction in Stock Write-offs</p></div>
            <div><p className="text-4xl font-bold text-emerald-400">15+</p><p className="text-sm text-slate-400 mt-1">Macro Food Categories</p></div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Comprehensive Intelligence Capability</h2>
            <p className="text-slate-600">A unified decision environment designed exclusively for high-velocity food manufacturers and operations managers.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3"><div className="text-emerald-600 text-xl"><i className="fa-solid fa-users"></i></div><h3 className="font-bold text-lg">Consumer Insights</h3><p className="text-sm text-slate-500">Track preference evolution, changing basket composition, shifts toward low-sugar or functional foods across different demographics.</p></div>
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3"><div className="text-emerald-600 text-xl"><i className="fa-solid fa-shield-halved"></i></div><h3 className="font-bold text-lg">Competitor Tracker</h3><p className="text-sm text-slate-500">Monitor rival pricing trends, promotional calendars, and distribution velocity adjustments across modern and traditional trade channels.</p></div>
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3"><div className="text-emerald-600 text-xl"><i className="fa-solid fa-arrow-trend-up"></i></div><h3 className="font-bold text-lg">Demand Forecasting</h3><p className="text-sm text-slate-500">ML models running on seasonality, real-time distributor data, and historical trends to provide accurate manufacturing targets.</p></div>
            <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm space-y-3"><div className="text-emerald-600 text-xl"><i className="fa-solid fa-tags"></i></div><h3 className="font-bold text-lg">Pricing Optimizer</h3><p className="text-sm text-slate-500">Evaluate regional price-positioning indexes and adjust factory-gate pricing without losing market share or margin.</p></div>
          </div>
        </section>

        {/* Workflow Execution */}
        <section id="workflow" className="bg-slate-100 py-20 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">How FoodMarket Transforms Operations</h2>
              <p className="text-slate-600">From raw ecosystem data to perfect processing execution in three phases.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg">1</div>
                <h4 className="text-xl font-bold">Connect Ecosystem Data</h4>
                <p className="text-sm text-slate-500">Pipe in standard primary ERP shipments, distributor invoices, field sales logs, or modern trade checkout flows seamlessly.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg">2</div>
                <h4 className="text-xl font-bold">Analyze Market Signals</h4>
                <p className="text-sm text-slate-500">Our engines clean, deduplicate, and cross-reference your brand's data against macroeconomic indicators and competitor activity.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 relative z-10 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-lg">3</div>
                <h4 className="text-xl font-bold">Take Definitive Action</h4>
                <p className="text-sm text-slate-500">Adjust production runs, optimize raw material purchasing schedules, configure regional trade promotions, and avoid waste.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3 text-white">
            <div className="bg-emerald-600 p-2 rounded text-base font-bold">F</div>
            <span className="font-bold text-lg tracking-tight">FoodCloudMega Intel</span>
          </div>
          <p className="text-xs">Contact:  Anthony Maina, CEO |
+254 728 225 125 | maina@foodcloudmega.com </p>
          <p className="text-xs">&copy; 2026 FoodCloudKenyaMarket Intelligence Inc. Global enterprise FCKM manufacturing networks. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}