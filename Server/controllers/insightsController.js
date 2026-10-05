// Server/controllers/insightController.js
const db = require('../config/db');

// Get all insights and sentiment matrices
exports.getConsumerIntelligence = async (req, res) => {
  try {
    const [insights] = await db.execute('SELECT * FROM consumer_insights ORDER BY created_at DESC');
    const [themes] = await db.execute('SELECT * FROM sentiment_themes');
    
    return res.status(200).json({
      success: true,
      insights,
      themes
    });
  } catch (error) {
    console.error("Failed to compile customer analytics:", error);
    return res.status(500).json({ success: false, message: "Database read failure." });
  }
};

// Add a fresh consumer insight event
exports.addConsumerInsight = async (req, res) => {
  try {
    const { severity, type, message, action } = req.body;
    const sql = 'INSERT INTO consumer_insights (severity, type, message, action) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [severity, type, message, action]);

    return res.status(201).json({ success: true, message: "Insight added successfully!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to store insight." });
  }
};

// Remove a closed or resolved insight action
exports.dismissInsight = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM consumer_insights WHERE id = ?', [id]);
    return res.status(200).json({ success: true, message: "Insight dismissed." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Failed to dismiss insight item." });
  }
};