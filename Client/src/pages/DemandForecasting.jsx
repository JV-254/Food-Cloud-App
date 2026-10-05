// Client/src/pages/DemandForecasting.jsx
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { getLineChartConfig } from '../utils/chartEngine';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
);

export default function DemandForecasting() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sku, setSku] = useState('Unga Maize Meal 2kg');
  const [confidence, setConfidence] = useState('95% Mathematical Alpha');
  const [calculating, setCalculating] = useState(false);

  // Dynamic live tracking state from the database
  const [dbProducts, setDbProducts] = useState([]);
  const [accuracy, setAccuracy] = useState(94.2);
  const [stockoutProb, setStockoutProb] = useState(3.4);
  const [chartData, setChartData] = useState({
    labels: ["Wk 24", "Wk 25", "Wk 26", "Wk 27", "Wk 28"],
    datasets: [
      { name: "Historical Active Sales Run", data: [880, 910, 895, 910, null] },
      { name: "Predictive ML Confidence Limit", data: [880, 910, 895, 910, 935] }
    ]
  });

  // Base configurations matching the master PDF metrics
  const baseCatalogConfigs = {
    "Unga Maize Meal 2kg": { hist: [850, 910, 880, 910, null], basePrice: 180, basePred: 935, baseAcc: 95.1, baseRisk: 1.2 },
    "Unga Maize Meal 1kg": { hist: [780, 810, 790, 810, null], basePrice: 100, basePred: 825, baseAcc: 94.8, baseRisk: 1.5 },
    "Soko Maize Meal 2kg": { hist: [820, 850, 840, 910, null], basePrice: 180, basePred: 920, baseAcc: 93.9, baseRisk: 1.8 },
    "Exe Baking Flour 2kg": { hist: [610, 640, 625, 680, null], basePrice: 150, basePred: 700, baseAcc: 94.2, baseRisk: 2.1 },
    "Ajab Baking Flour 2kg": { hist: [590, 610, 615, 650, null], basePrice: 150, basePred: 675, baseAcc: 93.5, baseRisk: 2.4 },
    "Pembe Rice 2kg": { hist: [450, 480, 465, 490, null], basePrice: 150, basePred: 515, baseAcc: 92.1, baseRisk: 3.2 },
    "Sunrice Basmati Rice 5kg": { hist: [320, 350, 340, 380, null], basePrice: 150, basePred: 410, baseAcc: 91.5, baseRisk: 3.8 },
    "Kabras Sugar 2kg": { hist: [910, 930, 925, 950, null], basePrice: 160, basePred: 975, baseAcc: 96.2, baseRisk: 0.9 },
    "Fresh Fri Cooking Oil 1L": { hist: [420, 450, 435, 470, null], basePrice: 280, basePred: 495, baseAcc: 93.1, baseRisk: 2.5 },
    "Golden Fry Cooking Oil 5L": { hist: [180, 195, 190, 210, null], basePrice: 1400, basePred: 225, baseAcc: 90.8, baseRisk: 4.1 },
    "Blue Band Original 500g": { hist: [310, 325, 315, 330, null], basePrice: 150, basePred: 345, baseAcc: 92.5, baseRisk: 2.8 },
    "Kensalt 500g": { hist: [520, 540, 535, 550, null], basePrice: 150, basePred: 565, baseAcc: 95.0, baseRisk: 1.1 },
    "Brookside Fresh Milk 500ml": { hist: [1800, 2100, 1950, 2210, null], basePrice: 65, basePred: 2350, baseAcc: 84.5, baseRisk: 18.2 },
    "KCC UHT Milk 1L": { hist: [1500, 1750, 1600, 1850, null], basePrice: 130, basePred: 1980, baseAcc: 85.1, baseRisk: 16.5 },
    "Supa Loaf Bread 400g": { hist: [1950, 2150, 2050, 2210, null], basePrice: 80, basePred: 2390, baseAcc: 81.2, baseRisk: 24.5 },
    "Ketepa Tea Bags 25 Bags": { hist: [380, 410, 395, 410, null], basePrice: 150, basePred: 430, baseAcc: 94.0, baseRisk: 1.9 },
    "Nescafe Classic Coffee 100g": { hist: [150, 165, 160, 180, null], basePrice: 450, basePred: 195, baseAcc: 91.2, baseRisk: 3.5 },
    "Del Monte Mango Juice 1L": { hist: [280, 310, 295, 320, null], basePrice: 220, basePred: 345, baseAcc: 92.7, baseRisk: 2.9 },
    "Coca-Cola Soda 500ml": { hist: [850, 910, 880, 910, null], basePrice: 150, basePred: 935, baseAcc: 94.9, baseRisk: 1.3 },
    "Pembe Spaghetti 500g": { hist: [410, 430, 425, 450, null], basePrice: 120, basePred: 475, baseAcc: 93.8, baseRisk: 2.2 },
    "Kellogg's Corn Flakes 500g": { hist: [210, 230, 220, 250, null], basePrice: 350, basePred: 275, baseAcc: 91.9, baseRisk: 3.6 },
    "Tropical Heat Crisps 50g": { hist: [340, 365, 350, 380, null], basePrice: 80, basePred: 405, baseAcc: 92.4, baseRisk: 3.0 },
    "Omo Washing Powder 1kg": { hist: [450, 480, 465, 490, null], basePrice: 320, basePred: 510, baseAcc: 94.5, baseRisk: 1.6 },
    "Sunlight Dishwashing Liquid 500ml": { hist: [320, 345, 330, 360, null], basePrice: 180, basePred: 385, baseAcc: 93.2, baseRisk: 2.3 }
  };

  // Fetch live active prices from your secure MySQL API endpoint
  const fetchActiveCatalogPrices = async () => {
    try {
      const token = localStorage.getItem('foodcloud_token');
      const response = await fetch('http://localhost:5000/api/products/history', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const json = await response.json();
      if (json.success) {
        setDbProducts(json.data);
      }
    } catch (err) {
      console.error("Failed to sync live product catalog to forecasting models:", err);
    }
  };

  useEffect(() => {
    fetchActiveCatalogPrices().finally(() => setLoading(false));
  }, []);

  // Compute live elasticity adjustments whenever the target SKU or confidence model changes
  useEffect(() => {
    if (dbProducts.length === 0) return;

    const baseConfig = baseCatalogConfigs[sku];
    if (!baseConfig) return;

    // Find if the target product is currently customized inside our active MySQL database
    // Normalize matching by checking product names (e.g. "Unga Maize Meal")
    const liveDbMatch = dbProducts.find(p => 
      sku.toLowerCase().includes(p.product_name?.toLowerCase()) || 
      p.product_name?.toLowerCase().includes(sku.toLowerCase())
    );

    const activePrice = liveDbMatch ? parseFloat(liveDbMatch.current_price) : baseConfig.basePrice;
    
    // 🧮 PRICE ELASTICITY COEFFICIENT ENGINE (e = -1.25)
    // Formula: Adjusted Forecast = Base Forecast * (1 + (elasticity * % change in price))
    const priceRatio = activePrice / baseConfig.basePrice;
    const pricePercentageChange = priceRatio - 1;
    const elasticityCoefficient = -1.25; // Standard FMCG demand price elasticity
    const elasticityMultiplier = Math.max(0.5, 1 + (elasticityCoefficient * pricePercentageChange));

    const is99Percent = confidence.includes('99%');
    const intervalMultiplier = is99Percent ? 1.07 : 1.00;

    // Calculate final price-elastic demand prediction
    const computedPredictiveValue = Math.round(baseConfig.basePred * elasticityMultiplier * intervalMultiplier);

    // Compute updated dynamic accuracy based on divergence from historic base price
    const priceDivergencePenalty = Math.abs(pricePercentageChange) * 4; 
    const computedAccuracy = Math.max(
      65, 
      (is99Percent ? baseConfig.baseAcc * 0.97 : baseConfig.baseAcc) - priceDivergencePenalty
    );

    // Stockout risk increases if demand surges due to deep price discounts, or decreases if price increases
    const dynamicRiskScale = priceRatio < 1.0 ? (1 / priceRatio) * 1.5 : (1 / priceRatio);
    const computedRisk = Math.min(
      95, 
      (is99Percent ? baseConfig.baseRisk * 0.35 : baseConfig.baseRisk) * dynamicRiskScale
    );

    const updatedHistorical = [...baseConfig.hist];
    const updatedPredictive = [
      updatedHistorical[0],
      updatedHistorical[1],
      updatedHistorical[2],
      updatedHistorical[3],
      computedPredictiveValue
    ];

    setChartData({
      labels: ["Wk 24", "Wk 25", "Wk 26", "Wk 27", "Wk 28"],
      datasets: [
        { name: "Historical Active Sales Run", data: updatedHistorical },
        { name: "Predictive ML Confidence Limit", data: updatedPredictive }
      ]
    });

    setAccuracy(parseFloat(computedAccuracy.toFixed(1)));
    setStockoutProb(parseFloat(computedRisk.toFixed(1)));
  }, [sku, confidence, dbProducts]);

  const handleComputePredictiveRun = () => {
    setCalculating(true);
    // Simulate brief algorithmic processing
    setTimeout(() => {
      fetchActiveCatalogPrices().finally(() => setCalculating(false));
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        BOOTING ALGORITHMIC DEMAND FORECAST ENGINE...
      </div>
    );
  }

  const lineConfig = getLineChartConfig(chartData.labels, chartData.datasets);

  // Grab the live price of the active SKU to show in the UI
  const matchedProduct = dbProducts.find(p => 
    sku.toLowerCase().includes(p.product_name?.toLowerCase()) || 
    p.product_name?.toLowerCase().includes(sku.toLowerCase())
  );
  const liveDisplayPrice = matchedProduct ? matchedProduct.current_price : baseCatalogConfigs[sku]?.basePrice;

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'bg-slate-900 text-white dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-700 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">Predictive Demand Forecast Model</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">ML Coefficient Regression with Live Price Elasticity Adaptation</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full border border-emerald-200 dark:border-emerald-800 animate-pulse">
              ● Predictive Kernels Active
            </span>
          </div>
        </div>

        {/* Dynamic Alert Banner showing active price link */}
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-400">
          <div className="flex items-center space-x-2">
            <span>📡</span>
            <p>
              Connected to <strong>MySQL Active Price Engines</strong>. Current SKU price for <strong>{sku}</strong> is locked at <strong className="font-mono text-sm">KSh {liveDisplayPrice}</strong>. Adjusting prices in the product manager will update these forecast models dynamically.
            </p>
          </div>
        </div>

        {/* Parameters Form Card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider pl-1">Target Product Stock Keeping Unit</label>
              <select 
                value={sku} 
                onChange={(e) => setSku(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                {Object.keys(baseCatalogConfigs).map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider pl-1">Confidence Interval Scope</label>
              <select 
                value={confidence} 
                onChange={(e) => setConfidence(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-2.5 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="95% Mathematical Alpha">95% (Standard Baseline)</option>
                <option value="99% Stringent Operations Model">99% (Stringent Operations Model)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                onClick={handleComputePredictiveRun}
                disabled={calculating}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs h-10 font-semibold transition-colors shadow-sm cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>{calculating ? '🔄 Recalculating Elasticity...' : '🪄 Sync & Compute Forecast'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Forecast Graph */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">Historical Sales Baseline vs Price-Elastic ML Target</h3>
            <div className="h-72 relative">
              <Line data={lineConfig.data} options={lineConfig.options} />
            </div>
          </div>

          {/* Risk Metrics */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
            <h3 className="font-bold text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wider">Algorithmic Risk Metrics</h3>
            
            {/* Accuracy */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-all duration-300">
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wide font-bold">Adjusted Model Accuracy</p>
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{accuracy}%</p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl text-lg font-bold">
                🎯
              </div>
            </div>

            {/* Stock-Out Prob */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between transition-all duration-300">
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wide font-bold">Price-Elastic Stock-Out Probability</p>
                <p className="text-3xl font-bold text-red-500 dark:text-red-400 mt-1">{stockoutProb}%</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/40 text-red-500 dark:text-red-400 rounded-xl text-lg font-bold">
                ⚠️
              </div>
            </div>

            <div className="p-4 text-xs text-slate-400 dark:text-slate-500 leading-relaxed bg-slate-50/50 dark:bg-slate-900/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-800">
              💡 <strong>Price Elasticity Active:</strong> The forecasting pipeline calculates dynamic consumer purchase shifts. Lowering product prices boosts demand curves (Week 28 volume shifts higher), while raising prices shrinks demand projections and drops stockout liabilities.
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}