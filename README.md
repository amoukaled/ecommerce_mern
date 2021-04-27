## Notice

**This is a portfolio project and it is not ready for production use.**

## API Routes

```
localhost:5000/api
                |--- /items GET
                |
                |--- /user
                |        |
                | POST   |--- /login
                |        |
                | POST   |--- /register
                |        |
                | GET    |--- /logout
                |        |
                | POST   |--- /invoice/create
                |        |
                | GET    |--- /invoice/:id
                |        |
                | GET    |--- /invoices
                |        |
                | GET    |--- /verify
                |        |
                | GET    |--- /address
                |
                |
                |--- /admin
                |        |
                | GET    |--- /items
                |        |
                | POST   |--- /items/create
                |        |
                | GET    |--- /items/:id
                |        |
                | PATCH  |--- /items/:id
                |        |
                | DELETE |--- items/:id
                |        |
```

---

## Getting started

#### Installation

1. Clone the repo.
1. `cd` into the project folder.
1. Run `npm install` in the root directory to install the Express dependencies.
1. `cd /client` and run `npm install` to install the React dependencies.

#### Pre-requisites

- Create `.env` file in the root directory with the following variables:

  - `MONGO_URI=<MongoDB Atlas URI>`

  - `SECRET=<your session secret>`

- Since the admin routes are only available via the API endpoints, it is recommended to use an API Client (eg. Postman, Insomnia) to use the admin functionality.

#### NPM scripts

##### React

To start the front-end server only, run `npm run client`.

##### Express

To start the express server only, run `npm run server`.

##### Simultaneously

To run both the front-end and the backend simultaneously, run `npm run dev`.

#### Running the app

1. Run `npm run dev` to start both servers.
1. Go to `http://localhost:3000`.
1. Click on the `Register` button.
1. Fill all the required fields then click on `Register`.
1. Go to your **MongoDB Atlas** `users` collection.
1. Change the `role` field from `USER` to `ADMIN`.
1. Start your API Client.
1. Create a `POST` request to `http://localhost:5000/api/user/login`.
1. Set the `Content-Type` to `application/json`.
1. Set the `email` and `password` field in the request body as follows:

```
{
	"email": // the email used in step 4,
	"password": // password
}
```

11. Create a `POST` request to `http://localhost:5000/api/admin/items/create`.
1. Set the `Content-Type` to `application/json`.
1. Set the `Cookie` field to the `session` cookie for `localhost`.
1. Set the request body to:

```
{
	"item": {
		"title": "iPhone",
		"price": 1000,
		"currency": "USD",
		"category": "Mobiles",
		"discount": 10,
		"quantity": 10,
		"image": //check the sample image below
	}
}
```

15. Send the request and go to `http://localhost:3000` to check the newly added item.

#### Sample Image

![Sample image](https://github.com/amoukaled/ecommerce_mern/blob/main/image.png?raw=true)

[Image base64](https://github.com/amoukaled/ecommerce_mern/blob/main/image.txt)

#### Patching Items

1. Create a `POST` request to `http://localhost:5000/api/admin/items/:id`.
1. Set the `Content-Type` to `application/json`.
1. Set the `Cookie` field to the `session` cookie for `localhost`.
1. Set the request body to:

```
{
	"item": {
    // insert the field you want to patch, for example:
		"title": "Samsung",
		"price": 800
	}
}
```
