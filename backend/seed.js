import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/product.js';
import products from './data/products.js';

dotenv.config();

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding');

    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(products);
      console.log('Seeded default products into MongoDB');
    } else {
      console.log(`Products collection already has ${count} documents`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedProducts();
