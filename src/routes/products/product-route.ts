import { Router } from "express";
import ProductController from "../../controller/products/product-controller";
import IProduct, { IValidKey } from "../../model/product/product-model";
import middleware, { IRequest } from '../../middleware/middleware';
const router = Router();

/**
 * Get All Products
 * Route: /api/products
 * Method: GET
 */
router.get('/', async (req, res) => {
  const { limit = 20, userId = null } = req.query;
  return res.json(await ProductController.getAllProducts(Number(limit), userId as string | null));
})

/**
 * Get a Product by id
 * Route: /api/products/:id
 * Method: GET
 */
router.get("/:id", async (req,res) => {
  const { id } = req.params;

  const product = await ProductController.getProduct(id);

  if(!product){
    return res.status(404).json({
      error: `Could not find product with id of ${id}`
    })

  }
  return res.json(product);
})

/**
 * add a product
 * route /api/products
 * Method Post
 * Body: Omit<IProduct, id>
 */
router.post('/', middleware.ensureAuth, async (req,res) => {
  const errors: { field: string, error: string}[] = [];
  const requiredFields: Array<IValidKey> = [
    'name',
    'details',
    'price',
    'quantity',
    'inStock'
  ]

  requiredFields.forEach(field => {
    switch(field){
      case 'details':
        if(!req.body.details){
          errors.push({
            field: 'details',
            error: 'details field (object) is required'
          })
          break;
        }
        if(typeof req.body.details !== 'object'){
          errors.push({
            field: 'details',
            error: 'details field should be an object of key, string fields'
          })
        }
        break;
      case 'price':
        if(!req.body.price){
          errors.push({
            field: 'price',
            error: 'price field (number) is required'
          })
          break;
        }
        if(typeof req.body.price !== 'number'){
          errors.push({
            field: 'price',
            error: 'price field value should be a number'
          })
        }
        break;
      case 'quantity':
        if(!req.body.quantity){
          errors.push({
            field: 'quantity',
            error: 'quantity field (number) is required'
          })
          break;
        }
        if(typeof req.body.quantity !== 'number'){
          errors.push({
            field: 'quantity',
            error: 'quantity field value should be a number'
          })
        }
        break;
      case 'name':
        if(!req.body.name){
          errors.push({
            field: 'name',
            error: 'name field (string) is required'
          })
          break;
        }
        if(typeof req.body.name !== 'string'){
          errors.push({
            field: 'name',
            error: 'name field value should be a string'
          })
        }
        break;
        default:
          break;
    }

  })
  if(errors.length > 0){
    return res.status(400).json(errors)
  }

  const { price, name, details, quantity} = req.body as Omit<IProduct, 'id'>
  const newProduct: Omit<IProduct, 'id'> = {
    userId: (req as IRequest).user.id,
    price,
    name,
    details,
    quantity,
    inStock: quantity > 0
  }
  const productResourceUrl = await ProductController.AddAProduct(newProduct);

  return res.status(201).json({
    message: 'New Product Created',
    resource: productResourceUrl
  })
})

/**
 * update a product by id
 * Route: /api/products/:id,
 * Method: PUT,
 * Body: Partial<Omit<IProduct, 'id'>>
 */
router.put('/:id', middleware.ensureAuth, async (req, res) => {
  const { id } = req.params;
  const productToUpdate = req.body;
  const validProps: Array<string> = [
    'price',
    'details',
    'inStock',
    'quantity',
    'name'
  ];
  for(let key in productToUpdate){
    if(validProps.indexOf(key) === -1){
      delete productToUpdate[key];
    }
  }

  const updatedProduct = await ProductController.updateAProduct(id, productToUpdate, (req as IRequest).user)

  if(!updatedProduct){
    return res.status(404).json({
      error: `Could not find / update product with id of ${id}`
    })
  }

  return res.json({
    message: "Product Updated Succesfully",
    updatedProduct
  })
  
})

/**
 * Delete a product
 * Route /api/products/:id
 * Method DELETE
 */
router.delete('/:id', middleware.ensureAuth, async (req, res) => {
  const { id } = req.params;
  const productWasFoundAndDeleted = await ProductController.deleteProduct(id, (req as IRequest).user);

  if(!productWasFoundAndDeleted){
    return res.status(404).json({
      error: `Could not find / update product with id of ${id}`
    })
  }

  return res.status(204).json({
    message: "Product Deleted"
  });
})

export default router;