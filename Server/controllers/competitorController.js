// Server/controllers/competitorController.js
const db = require('../config/db');

// 🛡️ SECURE: Fetch all competitors, dynamically calculate market share, and parameterize orders
exports.getCompetitors = async (req, res) => {
  try {
    // 1. Fetch competitors securely using connection pool execute
    const [rows] = await db.execute('SELECT * FROM competitors ORDER BY est_sales_vol DESC');
    
    // 2. Calculate total industry sales volume from registered competitors
    const totalVolume = rows.reduce((acc, curr) => acc + parseFloat(curr.est_sales_vol || 0), 0);
    
    // 3. Map competitors and inject dynamic share logic
    const formattedCompetitors = rows.map(comp => {
      const salesVolume = parseFloat(comp.est_sales_vol || 0);
      const sharePercentage = totalVolume > 0 ? ((salesVolume / totalVolume) * 100).toFixed(1) : "0.0";
      
      return {
        id: comp.id,
        name: comp.name,
        share: `${sharePercentage}%`,
        sales: `KSh ${(salesVolume / 1000000).toFixed(1)}M`,
        rawSales: salesVolume,
        skus: comp.skus || 0,
        promotion: comp.promotion || 'None',
        trend: comp.trend_status || 'Stable'
      };
    });

    return res.status(200).json({
      success: true,
      data: formattedCompetitors
    });
  } catch (error) {
    console.error("Database secure fetch exception:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to read competitive database matrix." 
    });
  }
};

// 🛡️ SECURE: Add a new competitor with fully parameterized queries
exports.addCompetitor = async (req, res) => {
  try {
    const { name, sales_vol, skus, promotion, trend } = req.body;
    
    // Prepared statement strictly isolates entries to prevent SQL injection
    const sqlQuery = `
      INSERT INTO competitors (
        name, 
        est_sales_vol, 
        skus, 
        promotion, 
        trend_status
      ) VALUES (?, ?, ?, ?, ?)
    `;
    
    const queryParameters = [
      name, 
      sales_vol, 
      skus, 
      promotion, 
      trend || 'Stable'
    ];

    await db.execute(sqlQuery, queryParameters);

    return res.status(201).json({ 
      success: true, 
      message: "Competitor profile logged securely!" 
    });
  } catch (error) {
    console.error("Database secure insert exception:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to save competitor profile." 
    });
  }
};

// 🛡️ SECURE: Purge a competitor using parameterized query parameter IDs
exports.deleteCompetitor = async (req, res) => {
  try {
    const { id } = req.params;

    const sqlQuery = 'DELETE FROM competitors WHERE id = ?';
    await db.execute(sqlQuery, [id]);

    return res.status(200).json({ 
      success: true, 
      message: "Competitor profile purged." 
    });
  } catch (error) {
    console.error("Database secure delete exception:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to remove competitor." 
    });
  }
};