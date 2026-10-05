// Client/src/pages/CompetitorAnalysis.jsx
import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { getDoughnutChartConfig } from '../utils/chartEngine';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
);

export default function CompetitorAnalysis() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  // State for both database streams
  const [competitors, setCompetitors] = useState([]);
  const [companyProducts, setCompanyProducts] = useState([]);
  
  // Creation Form State Metrics
  const [name, setName] = useState('');
  const [salesVol, setSalesVol] = useState('');
  const [skus, setSkus] = useState('');
  const [trend, setTrend] = useState('Stable');

  // Fetch both datasets concurrently
  const fetchMarketIntelligence = async () => {
    try {
      const token = localStorage.getItem('foodcloud_token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

      const [compRes, prodRes] = await Promise.all([
        fetch('http://localhost:5000/api/competitors', { headers }),
        fetch('http://localhost:5000/api/products/history', { headers })
      ]);

      const compJson = await compRes.json();
      const prodJson = await prodRes.json();

      if (compJson.success) setCompetitors(compJson.data);
      if (prodJson.success) setCompanyProducts(prodJson.data);
    } catch (err) {
      console.error("Error connecting to live market intelligence streams:", err);
    }
  };

  useEffect(() => {
    fetchMarketIntelligence().finally(() => setLoading(false));
  }, []);

  const handleAddCompetitor = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('foodcloud_token');
    
    fetch('http://localhost:5000/api/competitors', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: JSON.stringify({ name, sales_vol: salesVol, skus, promotion: 'Medium', trend })
    })
    .then((res) => res.json())
    .then((json) => {
      if (json.success) {
        setName('');
        setSalesVol('');
        setSkus('');
        fetchMarketIntelligence();
      }
    });
  };

  const handleDeleteCompetitor = (id) => {
    if (window.confirm("Remove this competitor from intelligence tracking?")) {
      const token = localStorage.getItem('foodcloud_token');
      fetch(`http://localhost:5000/api/competitors/${id}`, { 
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      })
      .then(() => fetchMarketIntelligence());
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        CONNECTING DYNAMIC COMPETITOR TRACKING NODES...
      </div>
    );
  }

  // ==========================================
  // 📊 REAL-TIME CORE CALCULATION ENGINE
  // ==========================================

  // 1. Calculate Your Company's dynamic Revenue from the product catalog prices and sales velocity
  const companyRevenue = companyProducts.reduce((sum, prod) => {
    // Map dynamic velocity based on PDF specifications
    const monthlyVelocity = prod.product_name?.includes('Milk') || prod.product_name?.includes('Bread') ? 2210 : 910;
    const price = parseFloat(prod.current_price || 0);
    return sum + (price * monthlyVelocity);
  }, 0);

  const companySKUs = companyProducts.length;

  // 2. Aggregate competitor parameters
  const competitorSalesTotal = competitors.reduce((sum, comp) => sum + parseFloat(comp.rawSales || 0), 0);
  
  // Total overall market valuation (Us + Them)
  const totalMarketVolume = companyRevenue + competitorSalesTotal;

  // 3. Assemble unified dynamic list including Your Company (FoodCloud) at the top
  const companyProfile = {
    id: 'foodcloud-internal',
    name: 'FoodCloud Mega',
    isCompany: true,
    share: totalMarketVolume > 0 ? ((companyRevenue / totalMarketVolume) * 100).toFixed(1) : '0.0',
    sales: `KSh ${(companyRevenue / 1000000).toFixed(1)}M`,
    rawSales: companyRevenue,
    skus: companySKUs,
    trend: 'Rising' // Enterprise overall momentum
  };

  const formattedCompetitors = competitors.map(comp => {
    const rawSales = parseFloat(comp.rawSales || 0);
    const sharePercentage = totalMarketVolume > 0 ? ((rawSales / totalMarketVolume) * 100).toFixed(1) : '0.0';
    return {
      ...comp,
      share: `${sharePercentage}`,
      sales: `KSh ${(rawSales / 1000000).toFixed(1)}M`,
      isCompany: false
    };
  });

  const fullMarketList = [companyProfile, ...formattedCompetitors];

  // 4. Update Chart configs on the fly
  const labels = fullMarketList.map(item => item.name);
  const chartValues = fullMarketList.map(item => parseFloat(item.share));
  const doughnutConfig = getDoughnutChartConfig(labels, chartValues);

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'bg-slate-900 text-white dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">Competitor Analysis Intelligence</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Live share indexing and retail growth tracking across Kenyan FMCG spaces.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-800 animate-pulse">
              ● Live Connection Secure
            </span>
          </div>
        </div>

        {/* Input Profile Form */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Deploy Competitor Tracking Profile</h3>
          
          <form onSubmit={handleAddCompetitor} className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-50/60 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Brand Name</label>
              <input type="text" placeholder="e.g. Kapa Refineries" value={name} onChange={e => setName(e.target.value)} required className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Est Sales (KSh)</label>
              <input type="number" placeholder="e.g. 50000000" value={salesVol} onChange={e => setSalesVol(e.target.value)} required className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">SKU Depth</label>
              <input type="number" placeholder="SKU Count" value={skus} onChange={e => setSkus(e.target.value)} required className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none" />
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Sales Trend</label>
              <select value={trend} onChange={e => setTrend(e.target.value)} className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:border-emerald-500 focus:outline-none">
                <option value="Rising">📈 Rising Velocity</option>
                <option value="Falling">📉 Falling Velocity</option>
                <option value="Stable">➡️ Stable Velocity</option>
              </select>
            </div>

            <div className="flex items-end">
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs h-10 transition-colors shadow-sm cursor-pointer">
                + Deploy Competitor
              </button>
            </div>
          </form>
        </div>

        {/* Dynamic Matrix View Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Profiles Table */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Enterprise Competitor Matrices</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Brand Entity</th>
                    <th className="pb-3">Share Ratio</th>
                    <th className="pb-3">Est Revenue Vol</th>
                    <th className="pb-3">SKU Count</th>
                    <th className="pb-3">Retail Trend</th>
                    <th className="pb-3 text-right pr-2">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                  {fullMarketList.map((p) => (
                    <tr key={p.id} className={`transition-colors ${p.isCompany ? 'bg-emerald-50/40 dark:bg-emerald-950/20 hover:bg-emerald-50/60' : 'hover:bg-slate-50/50 dark:hover:bg-slate-700/30'}`}>
                      <td className="py-3.5 font-semibold pl-2 text-slate-900 dark:text-white">
                        {p.name} {p.isCompany && <span className="ml-1.5 text-[9px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-bold uppercase">Self</span>}
                      </td>
                      <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">{p.share}%</td>
                      <td className="py-3.5 font-medium text-slate-700 dark:text-slate-300">{p.sales}</td>
                      <td className="py-3.5 font-mono text-xs text-slate-600 dark:text-slate-400">{p.skus}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          p.trend === 'Rising' ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900' :
                          p.trend === 'Falling' ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900' :
                          'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                        }`}>
                          {p.trend === 'Rising' ? '📈 Rising' : p.trend === 'Falling' ? '📉 Falling' : '➡️ Stable'}
                        </span>
                      </td>
                      <td className="py-3.5 text-right pr-2">
                        {!p.isCompany ? (
                          <button onClick={() => handleDeleteCompetitor(p.id)} className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer">
                            Remove
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Protected</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Volume Interception Chart Card */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Volume Interception Risk</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Competitor sector coverage distribution ratio including self-indexation.</p>
            </div>
            <div className="h-64 w-full relative">
              {fullMarketList.length > 0 ? (
                <Doughnut data={doughnutConfig.data} options={doughnutConfig.options} />
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-slate-400 italic">
                  No competitors to render
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}