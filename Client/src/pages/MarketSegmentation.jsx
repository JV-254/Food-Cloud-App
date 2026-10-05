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

export default function MarketSegmentation() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Set up mock cohort metrics matching your template data values
  const [incomeData, setIncomeData] = useState({
    labels: ["Lower Mass", "Middle Mass", "Upper Mass"],
    datasets: [{ name: "Household Consumption Volume (%)", data: [65, 42, 18] }]
  });

  const [urbanDensityData, setUrbanDensityData] = useState({
    labels: ["Metro Nairobi", "Tier-2 Counties Hub", "Rural Modern Trade Networks"],
    data: [48, 35, 17]
  });

  useEffect(() => {
    // Simulate API fetch delay
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        GENERATING DEMOGRAPHIC SEGMENTATION MODELS...
      </div>
    );
  }

  // 💡 Generate chart configurations leveraging your centralized engine assets
  const barConfig = getLineChartConfig(incomeData.labels, incomeData.datasets);
  const doughnutConfig = getDoughnutChartConfig(urbanDensityData.labels, urbanDensityData.data);

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title Bar */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">AI Demographic Segmentation Models</h2>
            <p className="text-sm text-slate-500">Kenyan household cohort maps and geographic retail performance indices.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 animate-pulse">
              ● Segment Core Online
            </span>
          </div>
        </div>

        {/* Charts Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Income Cohort Bar Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Volume Consumed by Household Income Cohort</h3>
            <div className="h-64 relative">
              {/* Rendering as a styled Bar chart using Line chart layout fallback metrics */}
              <Bar data={barConfig.data} options={barConfig.options} />
            </div>
          </div>

          {/* Urban Density Doughnut Chart */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Urban Centers vs Rural Outpost Distribution Volume</h3>
            <div className="h-64 relative">
              <Doughnut data={doughnutConfig.data} options={doughnutConfig.options} />
            </div>
          </div>

        </div>

        {/* Strategic Consumer Cluster Profiles list */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Strategic Consumer Cluster Profiles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-5 border border-slate-100 dark:border-slate-700 rounded-xl space-y-2 bg-slate-50/30">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">The Nutrition-Focused Modern Buyer</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Concentrated heavily inside urban clusters like Nairobi and Kiambu. Willing to absorb up to a 20% price premium for low-sugar, clear ingredient labels, and functional benefits.
              </p>
            </div>

            <div className="p-5 border border-slate-100 dark:border-slate-700 rounded-xl space-y-2 bg-slate-50/30">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">The High-Volume Value Household</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Highly sensitive to structural price movements. Focused intensely on stable bulk staple food categories (e.g., 2KG Milling units) across both traditional retail systems and wholesale operations.
              </p>
            </div>

            <div className="p-5 border border-slate-100 dark:border-slate-700 rounded-xl space-y-2 bg-slate-50/30">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">The Single-Serve Convenience Consumer</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Velocity driven primarily through lower pack weights and smaller SKUs (e.g., confectionery or small dairy bottles) within high-density residential trade pathways.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}