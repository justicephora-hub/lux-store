const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// ═══════════════════════ IN-MEMORY DATABASE ═══════════════════════
let db = {
  products: [
    // HAIR CARE
    { id: 1, name: 'Silk Press Elixir', category: 'hair', supplier: 'Naturals by Thandi', price: 299, orig: 399, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop', rating: 4.8, reviews: 342, badge: 'bestseller' },
    { id: 2, name: 'Golden Crown Hair Serum', category: 'hair', supplier: 'LuxHair Co.', price: 199, orig: 279, img: 'https://images.unsplash.com/photo-1598627385297-5cef7cad9d67?w=500&h=600&fit=crop', rating: 4.6, reviews: 215, badge: 'sale' },
    { id: 3, name: 'HD Lace Closure 16"', category: 'hair', supplier: 'LuxHair Co.', price: 1299, img: 'https://images.unsplash.com/photo-1582459553258-95880b3e8cdc?w=500&h=600&fit=crop', rating: 4.9, reviews: 128, badge: 'new' },
    { id: 4, name: 'Baobab Oil Treatment', category: 'hair', supplier: 'Naturals by Thandi', price: 159, img: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=600&fit=crop', rating: 4.7, reviews: 89 },
    { id: 5, name: 'Protein Deep Conditioner', category: 'hair', supplier: 'Ubuntu Beauty', price: 129, img: 'https://images.unsplash.com/photo-1600625957369-a37b7785378e?w=500&h=600&fit=crop', rating: 4.5, reviews: 156 },
    
    // SKINCARE
    { id: 6, name: 'Glass Skin Essence', category: 'skincare', supplier: 'Seoul Glow', price: 449, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop', rating: 4.9, reviews: 587, badge: 'bestseller' },
    { id: 7, name: 'Rooibos Radiance Serum', category: 'skincare', supplier: 'Ubuntu Beauty', price: 249, orig: 349, img: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&h=600&fit=crop', rating: 4.7, reviews: 234, badge: 'sale' },
    { id: 8, name: 'Marula Face Oil', category: 'skincare', supplier: 'Naturals by Thandi', price: 199, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop', rating: 4.8, reviews: 412 },
    { id: 9, name: 'Shea Butter Moisturizer', category: 'skincare', supplier: 'AfriCosmetics', price: 179, img: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=500&h=600&fit=crop', rating: 4.6, reviews: 198 },
    { id: 10, name: 'Vitamin C Brightening Mask', category: 'skincare', supplier: 'Seoul Glow', price: 279, img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=600&fit=crop', rating: 4.8, reviews: 321, badge: 'new' },

    // NAILS
    { id: 11, name: 'Chrome Powder Deluxe', category: 'nails', supplier: 'NailPro Studio', price: 89, img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=600&fit=crop', rating: 4.9, reviews: 654, badge: 'bestseller' },
    { id: 12, name: 'Gel Coat Pro Formula', category: 'nails', supplier: 'NailPro Studio', price: 129, img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=600&fit=crop', rating: 4.7, reviews: 289 },
    { id: 13, name: 'Nail Art Brush Set', category: 'nails', supplier: 'NailPro Studio', price: 149, orig: 199, img: 'https://images.unsplash.com/photo-1610785066253-b0a26cfe74f8?w=500&h=600&fit=crop', rating: 4.8, reviews: 176, badge: 'sale' },
    { id: 14, name: 'Acrylic Powder Bundle', category: 'nails', supplier: 'NailPro Studio', price: 249, img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=600&fit=crop', rating: 4.6, reviews: 124 },
    { id: 15, name: 'Bio Gel Starter Kit', category: 'nails', supplier: 'NailPro Studio', price: 399, img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=600&fit=crop', rating: 4.9, reviews: 87, badge: 'new' },

    // JEWELLERY
    { id: 16, name: 'Gold Bar Necklace', category: 'jewellery', supplier: 'Lagos Glam', price: 1599, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop', rating: 4.9, reviews: 234, badge: 'bestseller' },
    { id: 17, name: 'Pearl Drop Earrings', category: 'jewellery', supplier: 'Lagos Glam', price: 899, orig: 1199, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop', rating: 4.8, reviews: 156, badge: 'sale' },
    { id: 18, name: 'Rose Gold Ring Set', category: 'jewellery', supplier: 'Lagos Glam', price: 1299, img: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=600&fit=crop', rating: 4.7, reviews: 98 },
    { id: 19, name: 'Beaded Charm Bracelet', category: 'jewellery', supplier: 'AfriCosmetics', price: 599, img: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=600&fit=crop', rating: 4.6, reviews: 178 },
    { id: 20, name: 'Statement Gold Choker', category: 'jewellery', supplier: 'Lagos Glam', price: 1899, img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=600&fit=crop', rating: 4.9, reviews: 89, badge: 'new' },
  ],
  
  categories: [
    { id: 'hair', name: 'Hair', description: 'Premium hair care & extensions', img: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=600&h=800&fit=crop', emoji: '💇‍♀️' },
    { id: 'skincare', name: 'Skincare', description: 'Luxury skincare & serums', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=800&fit=crop', emoji: '✨' },
    { id: 'nails', name: 'Nails', description: 'Gel, acrylic & nail art', img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=800&fit=crop', emoji: '💅' },
    { id: 'jewellery', name: 'Jewellery', description: 'Gold & statement pieces', img: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop', emoji: '👑' },
  ],

  suppliers: [
    { id: 1, name: 'Naturals by Thandi', origin: '🇿🇦 Cape Town', tags: ['Baobab', 'Marula', 'Natural'], emoji: '🌿', bg: '#F0FFF4', status: 'connected' },
    { id: 2, name: 'NailPro Studio', origin: '🇿🇦 Durban', tags: ['Gel', 'Art', 'Chrome'], emoji: '💅', bg: '#F5F0FF', status: 'connected' },
    { id: 3, name: 'Ubuntu Beauty', origin: '🇿🇦 Pretoria', tags: ['Rooibos', 'Botanicals', 'SA'], emoji: '✨', bg: '#FFFDF0', status: 'connected' },
    { id: 4, name: 'Seoul Glow', origin: '🇰🇷 Seoul, Korea', tags: ['Serums', 'Glass Skin'], emoji: '🧴', bg: '#F0F4FF', status: 'pending' },
    { id: 5, name: 'LuxHair Co.', origin: '🇺🇸 Atlanta, USA', tags: ['Lace', 'HD Wigs', 'Care'], emoji: '💇‍♀️', bg: '#FDF8F0', status: 'connected' },
    { id: 6, name: 'Lagos Glam', origin: '🇳🇬 Lagos, Nigeria', tags: ['Wigs', 'Braids', 'Naturals'], emoji: '👑', bg: '#FFF0F8', status: 'pending' },
    { id: 7, name: 'AfriCosmetics', origin: '🇰🇪 Nairobi, Kenya', tags: ['Naturals', 'Shea', 'Organic'], emoji: '🌺', bg: '#F0FFFB', status: 'available' },
  ],

  orders: [],
  carts: {},
};

// ═══════════════════════ API ENDPOINTS ═══════════════════════

// Get all products
app.get('/api/products', (req, res) => {
  const category = req.query.category;
  if (category && category !== 'all') {
    const filtered = db.products.filter(p => p.category === category);
    return res.json(filtered);
  }
  res.json(db.products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = db.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Get all categories with AI images
app.get('/api/categories', (req, res) => {
  res.json(db.categories);
});

// Get suppliers
app.get('/api/suppliers', (req, res) => {
  res.json(db.suppliers);
});

// Create order (from cart)
app.post('/api/orders', (req, res) => {
  const { cartItems, email, phone, address } = req.body;
  
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const shipping = subtotal >= 650 ? 0 : 85;
  const total = subtotal + shipping;

  const order = {
    id: `ORD-${Date.now()}`,
    items: cartItems,
    subtotal,
    shipping,
    total,
    email,
    phone,
    address,
    status: 'pending',
    createdAt: new Date(),
  };

  db.orders.push(order);
  res.json({ success: true, order });
});

// Get orders
app.get('/api/orders/:email', (req, res) => {
  const email = req.params.email;
  const orders = db.orders.filter(o => o.email === email);
  res.json(orders);
});

// Get AI generated category images
app.get('/api/category-images/:category', (req, res) => {
  const category = req.params.category;
  const cat = db.categories.find(c => c.id === category);
  
  if (!cat) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json({
    category,
    image: cat.img,
    name: cat.name,
    description: cat.description,
    emoji: cat.emoji,
  });
});

// Search products
app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase();
  if (!query) return res.json([]);
  
  const results = db.products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.supplier.toLowerCase().includes(query)
  );
  
  res.json(results);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// ═══════════════════════ ERROR HANDLING ═══════════════════════
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong', message: err.message });
});

// ═══════════════════════ SERVER START ═══════════════════════
app.listen(PORT, () => {
  console.log(`\n✅ GLŌWHAUS Server running on http://localhost:${PORT}`);
  console.log(`📦 Products: ${db.products.length}`);
  console.log(`🏪 Categories: ${db.categories.length}`);
  console.log(`🤝 Suppliers: ${db.suppliers.length}\n`);
});

module.exports = app;
