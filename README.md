
### A Simple node express typescript boilerplate REST API

Build your express typescript project faster with boilerplate


## API Reference

#### Get all products

```http
  GET /api/products
```

#### Get a single product by id

```http
  GET /api/products/${id}
```

#### Add a product

```http
  POST /api/products/
```

| fields | Type     | Description                       | required |
| :-------- | :------- | :-------------------------------- | :--|
| `name`      | `string` | name of product | yes |
| `details`   | `object<{ [key:string]: any}>` | details of product | yes |
| `price`     | `number` | price of product | yes |
| `quantity`  | `number` | quantity of product | yes |



#### update a product

```http
  PUT /api/products/${id}
```

| fields | Type     | Description                       | required |
| :-------- | :------- | :-------------------------------- | :--|
| `name`      | `string` | name of product | no |
| `details`   | `object<{ [key:string]: any}>` | details of product | no |
| `price`     | `number` | price of product | no |
| `quantity`  | `number` | quantity of product | no |

#### Delete a product

```http
  DELETE /api/products/${id}
```
## Author

 - [Shmuel Leider](https://shmuelleider.com)

## Acknowledments
- [readme.so](https://readme.so) for README builder