import express from 'express';
import productRoutes from './routes/products/product-route';
import userRoutes from './routes/users/user-route';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/api";
const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.get("/", (req,res) => {
  res.json({
    message: "Hello World"
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  mongoose.connect(MONGO_URI).then(() => {
    console.log("Connected to MongoDb");
  }).catch(console.error)
});