USE foodcloud_db;

-- 1. Create Products Table with all your custom columns defined directly
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(255) NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    unit_pack VARCHAR(50) DEFAULT 'N/A',
    current_price DECIMAL(10, 2) NOT NULL,
    opening_stock INT DEFAULT 0,
    current_stock INT DEFAULT 0,
    stock_value DECIMAL(12, 2) DEFAULT 0.00,
    risk_index VARCHAR(100) DEFAULT 'Optimal',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create Price History Tracking Table
CREATE TABLE IF NOT EXISTS price_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    old_price DECIMAL(10, 2) NOT NULL,
    new_price DECIMAL(10, 2) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- 3. Safe Data Sync Block (Temporarily bypass foreign keys to clear previous structure safely)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE products;
SET FOREIGN_KEY_CHECKS = 1;

-- 4. Insert Your FMCG Product Master List
INSERT INTO products (
  id, 
  category, 
  product_name, 
  unit_pack, 
  current_price, 
  opening_stock, 
  current_stock, 
  stock_value, 
  risk_index
) VALUES
-- PAGE 1 - Staples & Oils
(1, 'Staples & Dry Foods', 'Unga Maize Meal', 'Pack: 1kg', 100.00, 1200, 720, 72000.00, 'Optimal'),
(2, 'Staples & Dry Foods', 'Unga Maize Meal', 'Pack: 2kg', 180.00, 1200, 720, 129600.00, 'Optimal'),
(3, 'Staples & Dry Foods', 'Soko Maize Meal', 'Pack: 2kg', 180.00, 1200, 720, 129600.00, 'Optimal'),
(6, 'Staples & Dry Foods', 'Exe Baking Flour', 'Pack: 2kg', 150.00, 1200, 720, 108000.00, 'Optimal'),
(7, 'Staples & Dry Foods', 'Ajab Baking Flour', 'Pack: 2kg', 150.00, 1200, 720, 108000.00, 'Optimal'),
(9, 'Staples & Dry Foods', 'Pembe Rice', 'Pack: 2kg', 150.00, 1200, 720, 108000.00, 'Optimal'),
(10, 'Staples & Dry Foods', 'Sunrice Basmati Rice', 'Pack: 5kg', 150.00, 1200, 720, 108000.00, 'Optimal'),
(12, 'Staples & Dry Foods', 'Kabras Sugar', 'Pack: 2kg', 160.00, 1200, 720, 115200.00, 'Optimal'),
(15, 'Cooking Oils & Spreads', 'Fresh Fri Cooking Oil', 'Pack: 1L', 280.00, 1200, 720, 201600.00, 'Optimal'),
(17, 'Cooking Oils & Spreads', 'Golden Fry Cooking Oil', 'Pack: 5L', 1400.00, 1200, 720, 1008000.00, 'Optimal'),

-- PAGE 1 & 2 - Dairy, Bakery, Beverages, and Spices
(19, 'Cooking Oils & Spreads', 'Blue Band Original', 'Pack: 500g', 150.00, 1200, 720, 108000.00, 'Optimal'),
(21, 'Household & Cleaning', 'Kensalt', 'Pack: 500g', 150.00, 1200, 720, 108000.00, 'Optimal'),
(24, 'Dairy Products', 'Brookside Fresh Milk', 'Pack: 500ml', 65.00, 1200, 112, 7280.00, 'Critical (Stock-out Risk)'),
(27, 'Dairy Products', 'KCC UHT Milk', 'Pack: 1L', 130.00, 1200, 112, 14560.00, 'Critical (Stock-out Risk)'),
(31, 'Bakery Products', 'Supa Loaf Bread', 'Pack: 400g', 80.00, 450, 112, 8960.00, 'Critical (Stock-out Risk)'),
(34, 'Beverages', 'Ketepa Tea Bags', 'Pack: 25 Bags', 150.00, 1200, 720, 108000.00, 'Optimal'),
(36, 'Beverages', 'Nescafe Classic Coffee', 'Pack: 100g', 450.00, 1200, 720, 324000.00, 'Optimal'),
(38, 'Beverages', 'Del Monte Mango Juice', 'Pack: 1L', 220.00, 1200, 720, 158400.00, 'Optimal'),

-- PAGE 2 - Beverages, Breakfast, Snacks, and Laundry
(39, 'Beverages', 'Coca-Cola Soda', 'Pack: 500ml', 150.00, 1200, 720, 108000.00, 'Optimal'),
(42, 'Staples & Dry Foods', 'Pembe Spaghetti', 'Pack: 500g', 120.00, 1200, 720, 86400.00, 'Optimal'),
(44, 'Cereals & Breakfast', 'Kellogg\s Corn Flakes', 'Pack: 500g', 550.00, 1200, 720, 396000.00, 'Optimal'),
(47, 'Snacks & Confectionery', 'Tropical Heat Crisps', 'Pack: 50g', 80.00, 1200, 720, 57600.00, 'Optimal'),
(49, 'Household & Cleaning', 'Omo Washing Powder', 'Pack: 1kg', 320.00, 1200, 720, 230400.00, 'Optimal'),
(50, 'Household & Cleaning', 'Sunlight Dishwashing Liquid', 'Pack: 500ml', 180.00, 1200, 720, 129600.00, 'Optimal');