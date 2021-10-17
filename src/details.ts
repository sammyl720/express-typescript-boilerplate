export default [
  {
    "name": "User",
    "root:": "/api/users",
    "routes:": [
      {
        "description:": "Get the current users info",
        "url:": "/api/users",
        "method:": "GET",
        "requirement:": {
          "header:": {
            "Authorization": "Bearer <token>"
          }
        },
        "returns:": "Current User's basic information or an error"
      },
      {
        "description:": "Signup User",
        "url:": "/api/users/signup",
        "method:": "POST",
        "requirements:": {
          "body:": {
            "username:": "The User's username - must be unique",
            "password:": "The User's password"
          }
        },
        "returns:": "A JWT Token or an Error"
      },
      {
        "description:": "Login User",
        "url:": "/api/users/login",
        "method:": "POST",
        "requirements:": {
          "body:": {
            "username:": "The User's username",
            "password:": "The User's password"
          }
        },
        "returns:": "A JWT Token or an Error"
      }
    ]
  },
  {
    "name:": "Product",
    "root:": "/api/products",
    "routes:": [
      {
        "description:": "Get all Products",
        "url:": "/api/products",
        "method:": "GET",
        "returns:": "A list of products"
      },
      {
        "description:": "Add a Products",
        "url:": "/api/products",
        "method:": "Post",
        "requirements:": [
          {
            "header:": {
              "Authorization": "Bearer <token>"
            },
            "body:": {
              "name:": "Name of product - string",
              "quantity:": "Amount of this product that is avaliable - number",
              "price:": "Price of product - number",
              "details:": "Addition details of product - object"
            }
          }
        ],
        "returns:": "A message and and a product resource url or an error"
      },
      {
        "description:": "Update a Product",
        "url:": "/api/products/:id",
        "method:": "PUT",
        "requirements:": [
          {
            "header:": {
              "Authorization": "Bearer <token>"
            }
          }
        ],
        "optional:": [
          {
            "body:": {
              "name:": "Name of product - string",
              "quantity:": "Amount of this product that is avaliable - number",
              "price:": "Price of product - number",
              "details:": "Addition details of product - object"
            }
          }
        ]
      },
      {
        
        "description:": "Delete a Product",
        "url:": "/api/products/:id",
        "method:": "DELETE",
        "requirements:": [
          {
            "header:": {
              "Authorization": "Bearer <token>"
            }
          }
        ],
        "returns:": "A message or an error"
      }
    ]
  }
]