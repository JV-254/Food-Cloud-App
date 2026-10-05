// Import the product controller
const productController = require('./controllers/productController');

// Define the API endpoints for inventory management
app.post('/api/products', productController.addProduct);
app.get('/api/products/history', productController.getProductsWithHistory);
app.put('/api/products/:id/price', productController.updateProductPrice);
app.delete('/api/products/:id', productController.removeProduct);