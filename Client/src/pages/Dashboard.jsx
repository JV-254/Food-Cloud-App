// Client/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import { getLineChartConfig, getDoughnutChartConfig } from '../utils/chartEngine';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, Title, Tooltip, Legend, ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, Title, Tooltip, Legend, ArcElement
);

// 💡 1. Product Inventory Manager (Internal Component Helper)
function ProductInventoryManager({ products, fetchInventory }) {
  const [category, setCategory] = useState('Staples & Dry Foods');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  
  // Manual Entry States for all requested columns
  const [unitPack, setUnitPack] = useState('');
  const [openingStock, setOpeningStock] = useState('');
  const [currentStock, setCurrentStock] = useState('');
  const [stockValue, setStockValue] = useState('');
  const [riskIndex, setRiskIndex] = useState('Optimal'); // Default select option
  
  const [editPrices, setEditPrices] = useState({});

  const categories = [
    "Staples & Dry Foods",
    "Cooking Oils & Spreads",
    "Dairy Products",
    "Bakery Products",
    "Beverages",
    "Snacks & Confectionery",
    "Cereals & Breakfast",
    "Household & Cleaning",
    "Personal Care Products",
    "Baby Care Products",
    "Feminine Hygiene",
    "Frozen & Fresh Foods",
    "Pharma & Health",
    "Pet & Animal Products"
  ];

  const handleAdd = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token

    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
      },
      body: JSON.stringify({ 
        category, 
        product_name: name, 
        price,
        unit_pack: unitPack,
        opening_stock: openingStock,
        current_stock: currentStock,
        stock_value: stockValue,
        risk_index: riskIndex
      })
    }).then(() => { 
      setName(''); 
      setPrice(''); 
      setUnitPack('');
      setOpeningStock('');
      setCurrentStock('');
      setStockValue('');
      setRiskIndex('Optimal');
      fetchInventory(); 
    });
  };

  const handlePriceUpdate = (id) => {
    if (!editPrices[id]) return;
    const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token

    fetch(`http://localhost:5000/api/products/${id}/price`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
      },
      body: JSON.stringify({ new_price: editPrices[id] })
    }).then(() => {
      setEditPrices(prev => ({ ...prev, [id]: '' }));
      fetchInventory();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this offerings listing?")) {
      const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token

      fetch(`http://localhost:5000/api/products/${id}`, { 
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
        }
      })
      .then(() => fetchInventory());
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-slate-900">Enterprise Offerings Inventory Manager</h3>
        <p className="text-xs text-slate-500">Provision, modify pricing tiers, or scrub localized brand catalogs dynamically.</p>
      </div>
      
      {/* 🛠️ Comprehensive Manual Entry Form */}
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-100">
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none">
            {categories.map((cat, i) => <option key={i} value={cat}>{cat}</option>)}
          </select>
        </div>
        
        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Product Designation</label>
          <input type="text" placeholder="e.g. Premium Pack" value={name} onChange={e => setName(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none" />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Unit Pack Weight</label>
          <input type="text" placeholder="e.g. 2KG, 500ML" value={unitPack} onChange={e => setUnitPack(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none" />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Base Price (KSh)</label>
          <input type="number" placeholder="Price per unit" value={price} onChange={e => setPrice(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none" />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Opening Stock</label>
          <input type="number" placeholder="Initial Balance" value={openingStock} onChange={e => setOpeningStock(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none" />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Current Stock</label>
          <input type="number" placeholder="Active Units" value={currentStock} onChange={e => setCurrentStock(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none" />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Total Stock Value (KSh)</label>
          <input type="number" placeholder="Manual Evaluation Val" value={stockValue} onChange={e => setStockValue(e.target.value)} required className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none" />
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Risk Index Status</label>
          <select value={riskIndex} onChange={e => setRiskIndex(e.target.value)} className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:border-emerald-500 focus:outline-none">
            <option value="Optimal">Optimal</option>
            <option value="Elevated Caution">Elevated Caution</option>
            <option value="Critical (Stock-out Risk)">Critical (Stock-out Risk)</option>
          </select>
        </div>

        <div className="flex items-end md:col-span-2 lg:col-span-4">
          <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs h-11 transition-colors shadow-sm cursor-pointer">
            + Add Custom Entry to Catalog Stream
          </button>
        </div>
      </form>

      {/* Manual Data Presentation Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-slate-400 text-xs uppercase border-b border-slate-100 tracking-wider">
              <th className="pb-3 pl-2">ID</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Product Name</th>
              <th className="pb-3">Unit Pack</th>
              <th className="pb-3">Current Value</th>
              <th className="pb-3">Opening Stock</th>
              <th className="pb-3">Current Stock</th>
              <th className="pb-3">Stock Value</th>
              <th className="pb-3">Risk Index</th>
              <th className="pb-3 text-right pr-2">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {products.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-8 text-center text-sm text-slate-400 italic">
                  No active offerings registered inside database nodes. Use the entry matrix above to fill items.
                </td>
              </tr>
            ) : (
              products.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 text-xs font-mono font-bold text-slate-400 pl-2">#{prod.id}</td>
                  <td className="py-3.5 text-xs font-semibold text-slate-400">{prod.category}</td>
                  <td className="py-3.5 font-semibold text-slate-900">{prod.product_name}</td>
                  <td className="py-3.5 font-mono text-xs text-slate-600">{prod.unit_pack}</td>
                  <td className="py-3.5 font-mono text-slate-600">KSh {parseFloat(prod.current_price || 0).toLocaleString()}</td>
                  <td className="py-3.5 font-mono text-xs text-slate-500">{prod.opening_stock}</td>
                  <td className="py-3.5 font-mono text-xs font-bold text-slate-800">{prod.current_stock}</td>
                  <td className="py-3.5 font-mono text-emerald-600 font-bold">KSh {parseFloat(prod.stock_value || 0).toLocaleString()}</td>
                  <td>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      prod.risk_index?.includes('Critical') ? 'bg-red-50 text-red-700 border border-red-100' :
                      prod.risk_index?.includes('Caution') ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-100'
                    }`}>
                      {prod.risk_index || 'Optimal'}
                    </span>
                  </td>
                  <td className="py-3.5 text-right space-x-2 pr-2">
                    <input 
                      type="number" 
                      placeholder="New KSh"
                      value={editPrices[prod.id] || ''}
                      onChange={e => setEditPrices({...editPrices, [prod.id]: e.target.value})}
                      className="w-20 rounded-lg px-2 py-1 text-xs border border-slate-200 focus:outline-none focus:border-blue-500 font-mono" 
                    />
                    <button onClick={() => handlePriceUpdate(prod.id)} className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
                      Update
                    </button>
                    <span className="text-slate-200">|</span>
                    <button onClick={() => handleDelete(prod.id)} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer">
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 💡 2. The Main Dashboard View Component
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false); 
  const [products, setProducts] = useState([]);
  
  const [marketData, setMarketData] = useState({
    overviewKPIs: {}, 
    salesTrend: { labels: [], datasets: [] },
    marketShare: { labels: [], data: [] }, 
    regionalPerformance: [], 
    aiInsights: []
  });

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token
      
      const response = await fetch('http://localhost:5000/api/analytics/dashboard', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
        }
      });
      
      const json = await response.json();
      if (json.success) {
        // Correctly set your dynamic charts & KPIs state upon success
        setMarketData(prev => ({
          ...prev,
          overviewKPIs: json.data.overviewKPIs || {},
          salesTrend: json.data.salesTrend || { labels: [], datasets: [] },
          marketShare: json.data.marketShare || { labels: [], data: [] }
        }));
      }
    } catch (err) {
      console.error("Dashboard database retrieval error:", err);
    }
  };

  const fetchInventory = () => {
    const token = localStorage.getItem('foodcloud_token'); // 🛡️ Retrieve Security Token

    return fetch('http://localhost:5000/api/products/history', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // 🔑 Secure request handshake
      }
    })
      .then(res => res.json())
      .then(json => { 
        if (json.success) {
          setProducts(json.data);
          setMarketData(prev => ({
            ...prev,
            overviewKPIs: json.liveOverviewKPIs || prev.overviewKPIs
          }));
        }
      });
  };

  useEffect(() => {
    Promise.all([fetchDashboardData(), fetchInventory()])
      .catch((err) => console.error("Pipeline breakdown fetching backend data telemetry:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">LOADING GLOBAL WORKSPACE INFRASTRUCTURE...</div>;
  }

  const lineConfig = getLineChartConfig(marketData.salesTrend.labels, marketData.salesTrend.datasets);
  const doughnutConfig = getDoughnutChartConfig(marketData.marketShare.labels, marketData.marketShare.data);

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Title Bar */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">FoodCloud Mega — Market <span>Intel</span> Overview</h2>
            <p className="text-sm text-slate-500">Kenyan FMCG Ecosystem Live Data Stream</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️Light Mode' : '🌙Dark Mode'}</span>
            </button>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200 animate-pulse">
              ● System Sync
            </span>
          </div>
        </div>

        {/* Overview KPIs Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(marketData.overviewKPIs).map(([key, value], idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm transition-transform hover:scale-[1.02] duration-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                {key.replace(/([A-Z])/g, ' $1')}
              </span>
              <p className="text-xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Charts Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Gross Sales Over Time</h3>
            <div className="h-72 relative">
              <Line data={lineConfig.data} options={lineConfig.options} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider mb-4">Market Share Matrix</h3>
            <div className="h-72 relative">
              <Doughnut data={doughnutConfig.data} options={doughnutConfig.options} />
            </div>
          </div>
        </div>

        {/* Render our internal helper component cleanly here */}
        <ProductInventoryManager products={products} fetchInventory={fetchInventory} />

      </div>
    </div>
  );
}