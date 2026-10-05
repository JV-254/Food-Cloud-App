USE foodcloud_db;

CREATE TABLE IF NOT EXISTS competitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    est_sales_vol DECIMAL(15, 2) NOT NULL,
    skus INT NOT NULL DEFAULT 0,
    promotion VARCHAR(50) NOT NULL DEFAULT 'Medium',
    trend_status VARCHAR(50) NOT NULL DEFAULT 'Stable', -- 'Rising', 'Falling', or 'Stable'
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed initial data matching your mock configuration parameters
INSERT INTO competitors (name, est_sales_vol, skus, promotion, trend_status) 
VALUES 
('East African Breweries Limited (EABL)', 928000000.00, 24, 'High', 'Rising'),
('Kapa Oil Refineries ', 772000000.00, 18, 'Medium', 'Falling'),
('Others', 504000000.00, 12, 'Low', 'Stable')
ON DUPLICATE KEY UPDATE est_sales_vol=VALUES(est_sales_vol);

SELECT * FROM competitors;