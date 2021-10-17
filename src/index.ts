import express from 'express';
import productRoutes from './routes/products/product-route';
import userRoutes from './routes/users/user-route';
import resources from './details';
import mongoose from 'mongoose';


type Method = "GET" | "POST" | "PUT" | "DELETE";


const app = express();

/**
 * enable json request body
 */
app.use(express.json());

/**
 * use the productRoutes router
 * for all routes that start with /api/products
 */
app.use('/api/products', productRoutes);

/**
 * use the userRoutes router
 * for all routes that start with /api/users
 */
app.use('/api/users', userRoutes);

/**
 * a simple greeting message
 */
app.get("/", (req,res) => {
  res.json({
    message: "Welcome to this simple rest api",
    resources
  })
});


(async () => {
  /**
   * if we're not in a production enviroment
   * use dotenv @link https://www.npmjs.com/package/dotenv npm package to load enviroment from .env file
   */
  if(process.env.NODE_ENV !== 'production'){
    const dotenv = await import("dotenv");
    dotenv.config()
  }

  /**
   * load the port number from enviroment or set port 3001 as default
   */
  const PORT = process.env.PORT || 3001;
  /**
   * load the mongodb connection string from enviroment or set local mongodb server as default
   */
  const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/db";
  
  /**
   * start application
   * and connect to mongodb
   */
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    mongoose.connect(MONGO_URI).then(() => {
      console.log("Connected to MongoDb database " + MONGO_URI.match(/\w+$/));
    }).catch(console.error)
  });
})()
