// expres gives set of home made code writen by mother of js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productsRoutes.js';
import cartRoutes from './routes/cart.js';
import addressRoutes from './routes/address.js';
import orderRoutes from './routes/orderRoutes.js';
import Product from './models/product.js';
import products from './data/products.js';

dotenv.config();

// express got renamed as app
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes);

app.get('/', (req, res) => {
  res.send('api is running...');
});

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log('Seeded default products into the database');
    }
  } catch (error) {
    console.error('Failed to seed products:', error.message);
  }
};

connectDB().then(seedProducts).catch((error) => {
  console.error('Database connection failed:', error.message);
});

// server started here the app is listening to any signel send on 5001
app.listen(5001, () => {
  console.log('Server is running on port 5001');
});