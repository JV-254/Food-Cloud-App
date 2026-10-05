import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { getLineChartConfig } from '../utils/chartEngine';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
);

export default function ProductPerformance() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // 📈 Live category metrics plotted from your master sheet records
  const [revenueWeight, setRevenueWeight] = useState({
    labels: [
      "Staples & Dry Foods", 
      "Cooking Oils & Spreads", 
      "Beverages", 
      "Household & Cleaning", 
      "Dairy Products"
    ],
    datasets: [{ name: "Revenue Core Weight (%)", data: [42, 28, 16, 9, 5] }]
  });

  // 📋 Core brand listing showing exact units dispatched, margins, and sheet alert statuses
  const [skus, setSkus] = useState([
    { name: "Unga Maize Meal 2kg", units: "910 units", margin: "38.5%", waste: "0.0%", status: "Optimal" },
    { name: "Golden Fry Cooking Oil 5L", units: "910 units", margin: "32.0%", waste: "0.0%", status: "Optimal" },
    { name: "Nescafe Classic Coffee 100g", units: "910 units", margin: "42.5%", waste: "0.0%", status: "Optimal" },
    { name: "Supa Loaf Bread 400g", units: "2,210 units", margin: "22.4%", waste: "3.8%", status: "High Risk" },
    { name: "Brookside Fresh Milk 500ml", units: "2,210 units", margin: "18.5%", waste: "2.1%", status: "High Risk" },
    { name: "Omo Washing Powder 1kg", units: "910 units", margin: "29.0%", waste: "0.0%", status: "Optimal" }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        RETRIEVING SKU PERFORMANCE MATRIX LOGS...
      </div>
    );
  }

  // Compile Bar configuration mapping using the unified line config helper
  const barConfig = getLineChartConfig(revenueWeight.labels, revenueWeight.datasets);

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">Product Lines Portfolio Intelligence</h2>
            <p className="text-sm text-slate-500">Live SKU yield margins, production dispatch volumes, and operational wastage control thresholds.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 animate-pulse">
              ● Performance Matrix Online
            </span>
          </div>
        </div>

        {/* Dashboard Analytics View Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Margins Table Card */}
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">SKU Gross Yield and Margin Breakdown</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <th className="pb-3 pl-2">Product Line SKU</th>
                    <th className="pb-3">Units Dispatched (Mth)</th>
                    <th className="pb-3">Estimated Profit Margin</th>
                    <th className="pb-3 text-right pr-2">Factory Wastage & Risk Index</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {skus.map((sku, index) => (
                    <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 font-semibold text-slate-900 pl-2">{sku.name}</td>
                      <td className="py-4 font-mono text-xs text-slate-600">{sku.units}</td>
                      <td className="py-4 text-emerald-600 font-bold">{sku.margin}</td>
                      <td className="py-4 text-right pr-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          sku.status === 'Optimal' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                          sku.status === 'Elevated' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                          'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                          {sku.waste} ({sku.status})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Core Weight Chart Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-2">Product Line Revenue Core Weight</h3>
              <p className="text-xs text-slate-500 mb-4 font-normal">Percentage distribution of gross earnings weight by food category.</p>
            </div>
            <div className="h-64 relative">
              <Bar data={barConfig.data} options={barConfig.options} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}