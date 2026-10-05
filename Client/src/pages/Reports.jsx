import React, { useState, useEffect } from 'react';

export default function Reports() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [compiling, setCompiling] = useState(false);

  // Form selections
  const [model, setModel] = useState('Weekly Micro-Market Volume Summary');
  const [format, setFormat] = useState('PDF'); // Default to PDF format
  const [region, setRegion] = useState('All Counties');

  // Interactive downloads repository state list (Enriched with your master platform blueprints)
  const [files, setFiles] = useState([
    {
      id: 1,
      name: "FoodCloud Product Master",
      format: "PDF",
      size: "36 KB",
      generatedOn: "Today, 08:15 AM",
      type: "blueprint"
    },
    {
      id: 2,
      name: "foodcloud_extended_inventory_master",
      format: "PDF",
      size: "35 KB",
      generatedOn: "Yesterday",
      type: "inventory"
    },
    {
      id: 3,
      name: "FoodCloud_Mega_AI_Platform_Database",
      format: "PDF",
      size: "40 KB",
      generatedOn: "July 10, 2026",
      type: "database"
    }
  ]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleCompile = (e) => {
    e.preventDefault();
    setCompiling(true);

    // Simulate standard document compilation loop delay
    setTimeout(() => {
      const cleanName = model.replace(/ /g, "_") + "_" + Math.floor(Math.random() * 1000);
      const randomSize = (Math.random() * 5 + 1).toFixed(1) + " MB";

      const newFile = {
        id: Date.now(),
        name: cleanName,
        format: format,
        size: randomSize,
        generatedOn: "Just Now",
        type: "compiled",
        meta: { model, region, format }
      };

      // Add to top of active repository file list stack
      setFiles((prevFiles) => [newFile, ...prevFiles]);
      setCompiling(false);
    }, 1500);
  };

  // 📥 Upgraded Download Trigger: Generates beautifully formatted PDFs for each document type
  const handleDownload = (file) => {
    if (file.format === "PDF" || file.type !== "compiled") {
      // Create a print window to render the styled document layout
      const printWindow = window.open('', '_blank', 'width=1000,height=800');
      
      let documentHtml = "";

      // 1. Structural Map: FoodCloud Product Master (FMCG Categories)[cite: 3]
      if (file.type === "blueprint") {
        documentHtml = `
          <html>
            <head>
              <title>${file.name}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print { body { -webkit-print-color-adjust: exact; } }
              </style>
            </head>
            <body class="p-8 bg-white font-sans text-slate-800">
              <div class="border-b-2 border-emerald-600 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <h1 class="text-3xl font-bold text-slate-900">FOODCLOUD KENYA</h1>
                  <p class="text-xs uppercase font-bold tracking-wider text-emerald-600">Product Master Configuration</p>
                </div>
                <div class="text-right text-xs text-slate-400">
                  <p>System Token: FMCG-PM-2026[cite: 3]</p>
                  <p>Date: ${file.generatedOn}</p>
                </div>
              </div>

              <div class="mb-6 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <p class="text-sm"><strong>Scope:</strong> 200-Product Cross-Category FMCG Schema[cite: 3]</p>
                <p class="text-sm"><strong>Target Execution Engine:</strong> Demand Forecasting, Dynamic Pricing Models[cite: 3]</p>
              </div>

              <h2 class="text-lg font-bold text-slate-800 mb-4">Core FMCG Category Allocation[cite: 3]</h2>
              <table class="w-full text-left text-sm border-collapse border border-slate-200">
                <thead>
                  <tr class="bg-slate-100 border-b border-slate-200">
                    <th class="p-3 font-semibold text-slate-700">Category[cite: 3]</th>
                    <th class="p-3 font-semibold text-slate-700">Target SKUs[cite: 3]</th>
                    <th class="p-3 font-semibold text-slate-700">Key Products[cite: 3]</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr><td class="p-3 font-semibold">1. Staples & Dry Foods[cite: 3]</td><td class="p-3">30 Products[cite: 3]</td><td class="p-3">Maize/Wheat/Baking flour, Rice, Sugar, Pasta[cite: 3]</td></tr>
                  <tr class="bg-slate-50/50"><td class="p-3 font-semibold">2. Cooking Oils & Spreads[cite: 3]</td><td class="p-3">15 Products[cite: 3]</td><td class="p-3">Vegetable oils, Sunflower oil, Margarine, Honey[cite: 3]</td></tr>
                  <tr><td class="p-3 font-semibold">3. Dairy Products[cite: 3]</td><td class="p-3">20 Products[cite: 3]</td><td class="p-3">Fresh Milk, UHT Milk, Flavoured Milk, Yoghurt, Butter[cite: 3]</td></tr>
                  <tr class="bg-slate-50/50"><td class="p-3 font-semibold">4. Bakery Products[cite: 3]</td><td class="p-3">10 Products[cite: 3]</td><td class="p-3">White, Brown & Wholemeal Bread, Buns, Cookies[cite: 3]</td></tr>
                  <tr><td class="p-3 font-semibold">5. Beverages[cite: 3]</td><td class="p-3">25 Products[cite: 3]</td><td class="p-3">Sodas, Juices, Bottled Water, Hot Coffee/Tea, Energy Drinks[cite: 3]</td></tr>
                  <tr class="bg-slate-50/50"><td class="p-3 font-semibold">6. Snacks & Confectionery[cite: 3]</td><td class="p-3">15 Products[cite: 3]</td><td class="p-3">Potato Crisps, Biscuits, Chocolates, Sweets, Nuts[cite: 3]</td></tr>
                  <tr><td class="p-3 font-semibold">7. Cereals & Breakfast[cite: 3]</td><td class="p-3">10 Products[cite: 3]</td><td class="p-3">Corn Flakes, Oats, Muesli, Granola, Instant Porridge[cite: 3]</td></tr>
                  <tr class="bg-slate-50/50"><td class="p-3 font-semibold">8. Household & Cleaning[cite: 3]</td><td class="p-3">20 Products[cite: 3]</td><td class="p-3">Detergents, Liquid Soap, Cleaners, Tissue Paper, Towels[cite: 3]</td></tr>
                  <tr><td class="p-3 font-semibold">9. Personal Care Products[cite: 3]</td><td class="p-3">20 Products[cite: 3]</td><td class="p-3">Soaps, Toothpastes, Shampoos, Body Lotions, Deodorants[cite: 3]</td></tr>
                  <tr class="bg-slate-50/50"><td class="p-3 font-semibold">10. Baby Care Products[cite: 3]</td><td class="p-3">10 Products[cite: 3]</td><td class="p-3">Diapers, Wipes, Lotions, Powders, Baby Food, Oils[cite: 3]</td></tr>
                </tbody>
              </table>
            </body>
          </html>
        `;
      } 
      // 2. Structural Map: Extended Inventory Master Logging[cite: 2]
      else if (file.type === "inventory") {
        documentHtml = `
          <html>
            <head>
              <title>${file.name}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print { body { -webkit-print-color-adjust: exact; } }
              </style>
            </head>
            <body class="p-6 bg-white font-sans text-slate-800">
              <div class="border-b-2 border-emerald-600 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <h1 class="text-3xl font-bold text-slate-900">JV TECHNOLOGIES</h1>
                  <p class="text-xs uppercase font-bold tracking-wider text-emerald-600">Extended Inventory Master Report[cite: 2]</p>
                </div>
                <div class="text-right text-xs text-slate-400">
                  <p>Generated: ${file.generatedOn}</p>
                </div>
              </div>

              <table class="w-full text-left text-[11px] border-collapse border border-slate-200">
                <thead>
                  <tr class="bg-slate-800 text-white border-b border-slate-300">
                    <th class="p-2 font-semibold">ID[cite: 2]</th>
                    <th class="p-2 font-semibold">Product Name[cite: 2]</th>
                    <th class="p-2 font-semibold">Unit Pack[cite: 2]</th>
                    <th class="p-2 font-semibold">Op / Cur Stock[cite: 2]</th>
                    <th class="p-2 font-semibold">Sales Velocity[cite: 2]</th>
                    <th class="p-2 font-semibold">Stock Value[cite: 2]</th>
                    <th class="p-2 font-semibold">Risk Index[cite: 2]</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200">
                  <tr><td class="p-2 font-bold">FMCG001[cite: 2]</td><td class="p-2">Unga Maize Meal[cite: 2]</td><td class="p-2">Pack: 1kg[cite: 2]</td><td class="p-2">1,200 / 720[cite: 2]</td><td class="p-2">910/mth[cite: 2]</td><td class="p-2 font-bold">KES 72,000[cite: 2]</td><td class="p-2 text-green-600 font-bold">LOW[cite: 2]</td></tr>
                  <tr class="bg-slate-50"><td class="p-2 font-bold">FMCG002[cite: 2]</td><td class="p-2">Unga Maize Meal[cite: 2]</td><td class="p-2">Pack: 2kg[cite: 2]</td><td class="p-2">1,200 / 720[cite: 2]</td><td class="p-2">910/mth[cite: 2]</td><td class="p-2 font-bold">KES 129,600[cite: 2]</td><td class="p-2 text-green-600 font-bold">LOW[cite: 2]</td></tr>
                  <tr><td class="p-2 font-bold">FMCG003[cite: 2]</td><td class="p-2">Soko Maize Meal[cite: 2]</td><td class="p-2">Pack: 2kg[cite: 2]</td><td class="p-2">1,200 / 720[cite: 2]</td><td class="p-2">910/mth[cite: 2]</td><td class="p-2 font-bold">KES 129,600[cite: 2]</td><td class="p-2 text-green-600 font-bold">LOW[cite: 2]</td></tr>
                  <tr class="bg-slate-50"><td class="p-2 font-bold">FMCG006[cite: 2]</td><td class="p-2">Exe Baking Flour[cite: 2]</td><td class="p-2">Pack: 2kg[cite: 2]</td><td class="p-2">1,200 / 720[cite: 2]</td><td class="p-2">910/mth[cite: 2]</td><td class="p-2 font-bold">KES 108,000[cite: 2]</td><td class="p-2 text-green-600 font-bold">LOW[cite: 2]</td></tr>
                  <tr><td class="p-2 font-bold">FMCG015[cite: 2]</td><td class="p-2">Fresh Fri Cooking Oil[cite: 2]</td><td class="p-2">Pack: 1L[cite: 2]</td><td class="p-2">1,200 / 720[cite: 2]</td><td class="p-2">910/mth[cite: 2]</td><td class="p-2 font-bold">KES 201,600[cite: 2]</td><td class="p-2 text-green-600 font-bold">LOW[cite: 2]</td></tr>
                  <tr class="bg-slate-50"><td class="p-2 font-bold">FMCG017[cite: 2]</td><td class="p-2">Golden Fry Cooking Oil[cite: 2]</td><td class="p-2">Pack: 5L[cite: 2]</td><td class="p-2">1,200 / 720[cite: 2]</td><td class="p-2">910/mth[cite: 2]</td><td class="p-2 font-bold">KES 1,008,000[cite: 2]</td><td class="p-2 text-green-600 font-bold">LOW[cite: 2]</td></tr>
                  <tr><td class="p-2 font-bold">FMCG024[cite: 2]</td><td class="p-2">Brookside Fresh Milk[cite: 2]</td><td class="p-2">Pack: 500ml[cite: 2]</td><td class="p-2">450 / 112[cite: 2]</td><td class="p-2">2,210/mth[cite: 2]</td><td class="p-2 font-bold">KES 7,280[cite: 2]</td><td class="p-2 text-red-600 font-bold">HIGH[cite: 2]</td></tr>
                  <tr class="bg-slate-50"><td class="p-2 font-bold">FMCG027[cite: 2]</td><td class="p-2">KCC UHT Milk[cite: 2]</td><td class="p-2">Pack: 1L[cite: 2]</td><td class="p-2">450 / 112[cite: 2]</td><td class="p-2">2,210/mth[cite: 2]</td><td class="p-2 font-bold">KES 14,560[cite: 2]</td><td class="p-2 text-red-600 font-bold">HIGH[cite: 2]</td></tr>
                  <tr><td class="p-2 font-bold">FMCG031[cite: 2]</td><td class="p-2">Supa Loaf Bread[cite: 2]</td><td class="p-2">Pack: 400g[cite: 2]</td><td class="p-2">450 / 112[cite: 2]</td><td class="p-2">2,210/mth[cite: 2]</td><td class="p-2 font-bold">KES 8,960[cite: 2]</td><td class="p-2 text-red-700 font-bold">VERY HIGH[cite: 2]</td></tr>
                  <tr class="bg-slate-50"><td class="p-2 font-bold">FMCG049[cite: 2]</td><td class="p-2">Omo Washing Powder[cite: 2]</td><td class="p-2">Pack: 1kg[cite: 2]</td><td class="p-2">1,200 / 720[cite: 2]</td><td class="p-2">910/mth[cite: 2]</td><td class="p-2 font-bold">KES 230,400[cite: 2]</td><td class="p-2 text-green-600 font-bold">LOW[cite: 2]</td></tr>
                </tbody>
              </table>
            </body>
          </html>
        `;
      } 
      // 3. Structural Map: Relational Database Architecture Blueprint
      else if (file.type === "database") {
        documentHtml = `
          <html>
            <head>
              <title>${file.name}</title>
              <script src="https://cdn.tailwindcss.com"></script>
              <style>
                @media print { body { -webkit-print-color-adjust: exact; } }
              </style>
            </head>
            <body class="p-8 bg-white font-sans text-slate-800">
              <div class="border-b-2 border-emerald-600 pb-4 mb-6 flex justify-between items-end">
                <div>
                  <h1 class="text-3xl font-bold text-slate-900">FOODCLOUD MEGA AI</h1>
                  <p class="text-xs uppercase font-bold tracking-wider text-emerald-600">Database Schema Architecture Blueprint[cite: 1]</p>
                </div>
                <div class="text-right text-xs text-slate-400">
                  <p>Document Version: 1.0[cite: 1]</p>
                </div>
              </div>

              <div class="space-y-6">
                <div class="p-4 border border-slate-200 rounded-xl">
                  <h3 class="font-bold text-sm text-emerald-700">Table A: Product Master (Global Static Specifications)[cite: 1]</h3>
                  <p class="text-xs mt-1 text-slate-500"><strong>Fields:</strong> Product_ID (PK) | SKU_Number | Barcode | Product_Name | Category | Sub_Category | Brand | Standard_Shelf_Life_Days[cite: 1]</p>
                </div>
                <div class="p-4 border border-slate-200 rounded-xl">
                  <h3 class="font-bold text-sm text-emerald-700">Table B: Supply & Retail Mapping (Dynamic Regional Pricing)[cite: 1]</h3>
                  <p class="text-xs mt-1 text-slate-500"><strong>Fields:</strong> Mapping_ID (PK) | Product_ID (FK) | Supplier_Name | Distributor_Name | Retailer_Name | County_Region | Selling_Price[cite: 1]</p>
                </div>
                <div class="p-4 border border-slate-200 rounded-xl">
                  <h3 class="font-bold text-sm text-emerald-700">Table C: Inventory & Batch Ledger (Dynamic Spoilage Tracking)[cite: 1]</h3>
                  <p class="text-xs mt-1 text-slate-500"><strong>Fields:</strong> Batch_ID (PK) | Product_ID (FK) | Retailer_Name | Batch_Number | Stock_Units | Expiry_Date | Waste_Risk_Score[cite: 1]</p>
                </div>
              </div>
            </body>
          </html>
        `;
      } 
      // 4. Default Compiled Reports
      else {
        documentHtml = `
          <html>
            <head>
              <title>${file.name}</title>
              <script src="https://cdn.tailwindcss.com"></script>
            </head>
            <body class="p-8 bg-white font-sans text-slate-800">
              <div class="border-b-2 border-emerald-600 pb-4 mb-6">
                <h1 class="text-2xl font-bold text-slate-900">${file.name}</h1>
                <p class="text-xs text-slate-500">Generated System Output Summary Report[cite: 1]</p>
              </div>
              <p class="text-sm">Compiled successfully using selection filters:</p>
              <ul class="list-disc pl-5 mt-2 text-sm text-slate-600">
                <li><strong>Model Structure:</strong> ${file.meta?.model || 'General Performance Dashboard'}[cite: 1]</li>
                <li><strong>Regional Focus:</strong> ${file.meta?.region || 'All Counties'}[cite: 1]</li>
              </ul>
            </body>
          </html>
        `;
      }

      // Inject the styling, content structure, and fire print action
      printWindow.document.write(documentHtml);
      printWindow.document.close();
      
      // Delay slightly to ensure fonts/Tailwind CSS renders fully
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);

    } else {
      // Fallback: If downloading a CSV or Excel layout directly[cite: 1]
      let fileContent = "";
      let mimeType = "text/csv;charset=utf-8;";
      const filename = `${file.name}.${file.format.toLowerCase()}`;

      fileContent = [
        `"FoodCloud Kenya Market Intelligence Export - ${file.name}"`,
        `"Report Model","${file.meta?.model || 'General Performance Dashboard'}"`,
        `"Generated On","${file.generatedOn}"`,
        "",
        `"Product Name","Retail Price (Ksh)","Distribution Status"`,
        `"Premium Maize Meal 2KG","148.00","Optimal"`,
        `"Alpha Classic Yoghurt 500ML","130.00","Optimal"`
      ].join("\n");

      const blob = new Blob([fileContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      
      const tempAnchor = document.createElement("a");
      tempAnchor.href = url;
      tempAnchor.setAttribute("download", filename);
      document.body.appendChild(tempAnchor);
      tempAnchor.click();
      
      document.body.removeChild(tempAnchor);
      URL.revokeObjectURL(url);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-900 text-emerald-400 font-mono text-xs">
        RETRIEVING ENTERPRISE REPORT CACHE FILES...
      </div>
    );
  }

  return (
    <div className={`min-h-screen sidebar-transition p-6 w-full font-sans antialiased text-slate-800 ${darkMode ? 'dark-mode' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Header Section */}
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 transition-colors">Enterprise Report Generation Hub</h2>
            <p className="text-sm text-slate-500">Compile tailored workspace parameters, select formats, and manage your data stream exports.</p>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm text-xs font-semibold cursor-pointer hover:bg-slate-50/80 transition-all flex items-center space-x-2"
            >
              <span>{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}</span>
            </button>
            <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 shadow-sm px-3 py-1.5 rounded-xl">
              📅 July 16, 2026
            </span>
          </div>
        </div>

        {/* Dynamic Matrix Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Form Configuration Column */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 h-fit">
            <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Configure New Export Structure</h3>
            
            <form onSubmit={handleCompile} className="space-y-4">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Report Specification Model</label>
                <select 
                  value={model} 
                  onChange={(e) => setModel(e.target.value)}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none"
                >
                  <option value="Weekly Micro-Market Volume Summary">Weekly Micro-Market Volume Summary</option>
                  <option value="Competitor Price Elasticity Matrix">Competitor Price Elasticity Matrix</option>
                  <option value="Demand Forecast & Safety Stock Ledger">Demand Forecast & Safety Stock Ledger</option>
                  <option value="Consumer Preference Shift Analysis">Consumer Preference Shift Analysis</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Export Serialization Format</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none"
                >
                  <option value="PDF">Adobe Portable Document (.pdf)</option>
                  <option value="XLSX">Excel Spreadsheet format (.xlsx)</option>
                  <option value="CSV">Comma-Separated Values (.csv)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider pl-1">Regional Constraint Focus</label>
                <select 
                  value={region} 
                  onChange={(e) => setRegion(e.target.value)}
                  className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm bg-white focus:outline-none"
                >
                  <option value="All Counties">All Counties Ecosystem</option>
                  <option value="Nairobi Hub">Nairobi Core Hub Only</option>
                  <option value="Coast Region">Coast / Mombasa Core Hub</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={compiling}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white rounded-xl text-xs h-11 font-semibold transition-colors shadow-sm cursor-pointer flex items-center justify-center space-x-2"
              >
                {compiling && <span className="animate-spin text-sm">🔄</span>}
                <span>{compiling ? 'Assembling Matrix rows...' : 'Compile Report Stream'}</span>
              </button>
            </form>
          </div>

          {/* Downloads Logs Container */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">Generated Downloads Repository</h3>
                <span className="text-xs text-slate-400 font-bold">{files.length} Files available</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                      <th className="pb-3 pl-2">File / Document Name</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">File Size</th>
                      <th className="pb-3">Generated On</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {files.map((file) => (
                      <tr key={file.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-4 font-semibold text-slate-900 pl-2">{file.name}</td>
                        <td className="py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            file.format === 'XLSX' ? 'bg-green-50 text-green-700 border border-green-100' :
                            file.format === 'PDF' ? 'bg-red-50 text-red-700 border border-red-100' :
                            'bg-blue-50 text-blue-700 border border-blue-100'
                          }`}>
                            {file.format}
                          </span>
                        </td>
                        <td className="py-4 font-mono text-xs text-slate-500">{file.size}</td>
                        <td className="py-4 text-xs text-slate-400">{file.generatedOn}</td>
                        <td className="py-4 text-right pr-2">
                          <button 
                            onClick={() => handleDownload(file)}
                            className="text-emerald-600 hover:text-emerald-700 font-bold cursor-pointer text-lg p-1 hover:scale-110 transition-transform"
                            title={`Download ${file.name} as PDF`}
                          >
                            📥
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}