// Server/controllers/intelligenceController.js

const FoodMarketData = {
  categories: ["Laundry Detergents", "Generator", "Bathtubs", "Dishwashing Detergents", "Fumugation Detergents"],
  regions: ["Nairobi", "Kiambu", "Mombasa", "Nakuru", "Kisumu", "Eldoret"],
  
  overviewKPIs: {
    totalMarketValue: "KSh 4.2B",
    salesGrowth: "+12.4%",
    marketShare: "28.5%",
    avgProductPrice: "KSh 145",
    demandForecast: "Strong (+8.2%)",
    sentimentScore: "78/100"
  },

  salesTrend: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      { name: "Cloud Food Kenya)", data: [120, 135, 142, 138, 155, 172, 190] },
      { name: "Competitor: East African Breweries Limited (EABL) ", data: [95, 102, 110, 105, 112, 118, 125] },
      { name: "Competitor: Kapa Oil Refineries", data: [80, 85, 83, 89, 94, 92, 98] }
    ]
  },

  marketShare: {
    labels: ["Cloud Food Kenya", "Competitor: East African Breweries Limited (EABL) ", "Competitor: Kapa Oil Refineries", "Others"],
    data: [28.5, 22.1, 18.4, 12.0, 19.0]
  },

  categoryPerformance: {
    labels: ["Laundray Detergents", "Generator", "Bathtabs Detergent", "Dishwashing Detergents", "Fumigation Detergents"],
    sales: [45000000, 62000000, 31000000, 58000000, 18000000]
  },

  regionalPerformance: [
    { region: "Nairobi", sales: "KSh 1.45B", share: "34.5%", growth: "+14.2%", status: "Optimal" },
    { region: "Kiambu", sales: "KSh 820M", share: "19.5%", growth: "+11.8%", status: "Optimal" },
    { region: "Mombasa", sales: "KSh 640M", share: "15.2%", growth: "+6.4%", status: "Slowing" },
    { region: "Nakuru", sales: "KSh 510M", share: "12.1%", growth: "+9.1%", status: "Stable" },
    { region: "Kisumu", sales: "KSh 430M", share: "10.2%", growth: "+13.5%", status: "Optimal" },
    { region: "Eldoret", sales: "KSh 350M", share: "8.5%", growth: "-2.1%", status: "Risk" }
  ],

  aiInsights: [
    { id: 1, severity: "High", type: "demand", message: "Demand for low-sugar functional beverages in Nairobi is projected to increase by 24% next quarter. Recommend accelerating production setup.", action: "Optimize Supply" },
    { id: 2, severity: "Medium", type: "competitor", message: "Peak Industries reduced pricing on their 1KG Premium Wheat Flour SKU by 8% across retail chains in Kiambu.", action: "Price Matching Audit" },
    { id: 3, severity: "High", type: "sentiment", message: "Negative customer sentiment spikes (+15%) observed for 'Alpha Yoghurt Strawberry' regarding packaging durability in Mombasa.", action: "Quality Control QA" },
    { id: 4, severity: "Low", type: "trend", message: "Plant-based milk search queries and modern trade velocity in Nairobi grew 4.5% month-on-month.", action: "R&D Exploration" }
  ]
};

exports.getDashboardSummary = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: FoodMarketData
    });
  } catch (error) {
    console.error("Dashboard engine query breakdown:", error);
    return res.status(500).json({ success: false, message: "Error parsing analytics vectors." });
  }
};