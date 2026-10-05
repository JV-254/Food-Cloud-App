USE foodcloud_db;

-- Table to hold AI and Customer feedback insights
CREATE TABLE IF NOT EXISTS consumer_insights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    severity VARCHAR(50) NOT NULL, -- 'High', 'Medium', 'Low'
    type VARCHAR(100) NOT NULL, -- 'demand', 'competitor', 'sentiment', 'trend'
    message TEXT NOT NULL,
    action VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to log categorized sentiment patterns
CREATE TABLE IF NOT EXISTS sentiment_themes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    theme VARCHAR(255) NOT NULL UNIQUE,
    positive INT NOT NULL DEFAULT 0,
    neutral INT NOT NULL DEFAULT 0,
    negative INT NOT NULL DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Initial Datasets
INSERT INTO consumer_insights (severity, type, message, action) VALUES
('High', 'demand', 'Demand for low-sugar functional beverages in Nairobi is projected to increase by 24% next quarter. Recommend accelerating production setup.', 'Optimize Supply'),
('Medium', 'competitor', 'Peak Industries reduced pricing on their 1KG Premium Wheat Flour SKU by 8% across retail chains in Kiambu.', 'Price Matching Audit'),
('High', 'sentiment', 'Negative customer sentiment spikes (+15%) observed for ''Alpha Yoghurt Strawberry'' regarding packaging durability in Mombasa.', 'Quality Control QA'),
('Low', 'trend', 'Plant-based milk search queries and modern trade velocity in Nairobi grew 4.5% month-on-month.', 'R&D Exploration')
ON DUPLICATE KEY UPDATE severity=VALUES(severity);

INSERT INTO sentiment_themes (theme, positive, neutral, negative) VALUES
('Taste & Flavor Profile', 72, 18, 10),
('Price Elasticity Perception', 45, 35, 20),
('Packaging & Labeling Quality', 58, 22, 20),
('On-Shelf Availability', 81, 9, 10)
ON DUPLICATE KEY UPDATE positive=VALUES(positive);

SELECT * FROM consumer_insights;