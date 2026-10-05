// Server/server.js
require('dotenv').config(); // Load environment variables first

const express = require('express');
const cors = require('cors');
const secureGuard = require('./middleware/auth');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

// Controllers
const intelController = require('./controllers/intelligenceController');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const competitorController = require('./controllers/competitorController');
const insightsController = require('./controllers/insightsController');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================================
// 🛡️ SECURITY LAYER CONFIGURATION
// ============================================================

app.use(helmet());
app.use(express.json({ limit: '10kb' }));
app.use(xss());

const whitelist = ['http://localhost:5173']; 
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS security constraints.'));
    }
  },
  credentials: true
};
app.use(cors({ origin: true, credentials: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: "Too many requests from this network. Please try again after 15 minutes."
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});
app.use('/api/', apiLimiter);

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 10, 
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again in an hour."
  }
});

// ============================================================
// 🛣️ ROUTES
// ============================================================

// Dashboard Summary
app.get('/api/analytics/dashboard', secureGuard, intelController.getDashboardSummary);

// Auth Gateway (Protected by tighter rate-limit rules)
app.post('/api/auth/register', authLimiter, authController.registerCorporateProfile);
app.post('/api/auth/login', authLimiter, authController.loginWorkspace);
app.post('/api/auth/verify', authLimiter, authController.verifyCode);

// 🔑 Password Extraction & Recovery Pipeline Gateways
app.post('/api/auth/forgot-password', authController.forgotPassword);
app.post('/api/auth/verify-reset-code', authController.verifyResetCode);
app.post('/api/auth/reset-password', authController.resetPassword);

// Products Matrix
app.get('/api/products/history', secureGuard, productController.getProductsWithHistory);
app.post('/api/products', secureGuard, productController.addProduct);
app.put('/api/products/:id/price', secureGuard, productController.updateProductPrice);
app.delete('/api/products/:id', secureGuard, productController.removeProduct);

// Competitor Intelligence
app.get('/api/competitors', secureGuard, competitorController.getCompetitors);
app.post('/api/competitors', secureGuard, competitorController.addCompetitor);
app.delete('/api/competitors/:id', secureGuard, competitorController.deleteCompetitor);

// Consumer Insights & Sentiment Vectors
app.get('/api/insights', secureGuard, insightsController.getConsumerIntelligence);
app.post('/api/insights', secureGuard, insightsController.addConsumerInsight);
app.delete('/api/insights/:id', secureGuard, insightsController.dismissInsight);

// ============================================================
// 🚀 INITIATE ENGINE
// ============================================================
app.listen(PORT, () => {
  console.log(`[SECURITY ACTIVE] FoodCloud Mega Core Engine operational on port ${PORT}`);
});