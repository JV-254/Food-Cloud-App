import React, { useState, useEffect } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { getLineChartConfig, getDoughnutChartConfig } from '../utils/chartEngine';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
);

export default function SalesAnalytics() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // 📈 Category Sales state reflecting major operational values from inventory sheets
  const [categoryData, setCategoryData] = useState({
    labels: [
      "Staples & Dry Foods", 
      "Cooking Oils & Spreads", 
      "Beverages", 
      "Household & Cleaning", 
      "Dairy Products"
    ],
    datasets: [{ name: "Category Sales (KSh Millions)", data: [184.5, 131.8, 95.2, 46.8, 21.8] }]
  });

  // 🍩 Market Share state reflecting updated brand trajectory settings
  const [brandShare, setBrandShare] = useState({
    labels: ["FoodCloud Kenya", "East African Breweries Limited (EABL) ", "Kapa Oil Refineries", "Others"],
    data: [38.5, 27.0, 15.5, 11.0, 8.0]
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        RETRIEVING PORTFOLIO SALES & SHARE TELEMETRY...
      </div>
    );
  }

  // Compile ChartJS configurations leveraging your established engine parameters
  const barConfig = getLineChartConfig(categoryData.labels, categoryData.datasets);
  const doughnutConfig = getDoughnutChartConfig(brandShare.labels, brandShare.data);

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title Bar */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">Sales Revenue & Market Share Optimization</h2>
            <p className="text-sm text-slate-500">Global product line velocity, transactional revenue distributions, and structural brand volume trajectory.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 animate-pulse">
              ● Live Engine Active
            </span>
          </div>
        </div>

        {/* Visual Matrix Display Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Category Sales Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Product Category Performance Matrix</h3>
            <div className="h-64 relative">
              <Bar data={barConfig.data} options={barConfig.options} />
            </div>
          </div>

          {/* Volume Share Doughnut Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Historical Multi-Brand Volume Share Trajectory</h3>
            <div className="h-64 relative">
              <Doughnut data={doughnutConfig.data} options={doughnutConfig.options} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}