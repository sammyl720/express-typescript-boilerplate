import express from 'express';
import productRoutes from './routes/products/product-route';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes)
app.get("/", (req,res) => {
  res.json({
    message: "Hello World"
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});