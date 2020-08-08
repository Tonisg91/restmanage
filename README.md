# RestManage Web App (Backend)

## Developer:

  Toni Sanchez

# [Link to frontend repo](https://github.com/Tonisg91/restmanage-frontend)

## Description

Restmanage is an app for manage restaurants.

## Routes for Clients

| Method | URL                                           | Description                                                                   |
| ------ | -------------------------------------------- | ----------------------------------------------------------------------------- |
| GET    | '/'                                           | Data for user home                                                            |
| POST   | '/login'                                      | Login req && Redirect to /profile or cart                                     |
| POST   | '/signup'                                     | Redirect to /profile or cart && create an instance of user                    |
| GET    | '/logout'                                     | Close Session and redirect to '/'                                             |
| GET    | '/profile'                                    | Render account data (private)                                                 |
| POST   | '/profile/:userid/edit'                       | Update the user data                                                          |
| GET    | '/menu'                                       | Data of the menu of restaurant                                                |
| GET    | '/menu/category'                              | Render a product category                                                     |
| GET    | '/:productid'                                 | Render product details                                                        |
| POST   | '/addproduct/:productid'                      | Add product for cart/order                                                    |
| GET    | '/dailymenu                                   | Daily menu data                                                               |
| GET    | '/cart'                                       | Render current order & pay method                                             |
| POST   | '/cart/:orderId'                              | Pay & initiate order                                                          |

## Routes for Owner/Admin

| Method | URL                                           | Description                                                                   |
| ------ | -------------------------------------------- | ----------------------------------------------------------------------------- |
| GET    | '/admin/home'                                 | Response with data for /admin/home                                            |
| POST   | '/admin/login'                                | Log session for admin user                                                    |
| POST   | '/admin/logout'                               | Close Session                                                                 |
| POST   | '/admin/profile/edit'                         | Update the admin data                                                         |
| POST   | '/admin/dailymenu                             | Update the daily menu                                                         |
| GET    | '/admin/:productid'                                 | Render product details                                                  |

## Models
```
- admin: {
  - email
  - name
  - password
  - address
  - city
  - CC
    }

- Product: {
  - Name
  - Image
  - Category
  - Description
  - Available (boolean)
    }
    
- ProductList : [objectId 'products']

- Client: {
  - email
  - name
  - password
  - address {
      street:
      city:
      C.P:
      }
  - orders = [objectId 'order']
    }

- Orders: {
   - client
   - products
   - address
   - price
   - inProgress
   - finished
  }
  
- DailyMenu: {
    first: []
    second: []
    afters: []
    price: 
    notifications: boolean
  }


- Restaurant: {
   - theme
   - name
   ...
   
}
```
