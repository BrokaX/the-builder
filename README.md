# The builder
## _A Full stack Web-App_
<p align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg" width="100" />
  <img src="https://wsofter.ru/wp-content/uploads/2017/12/node-express.png" width="100" /> 
  <img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" width="100" />
  <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" width="100" />
</p>

The Builder is a website builder application built using the MERN stack (MongoDB, Express, React, Node.js). It uses the [GrapesJS](https://grapesjs.com/) framework for the front-end and allows users to create, edit and publish their own websites.


# Getting Started

To run the application locally, clone this repository  ```
$ git clone git@github.com:BrokaX/the-builder.git
``` and navigate to the `client` and `server` folders in separate terminal windows. Run `npm install` in each folder to install the necessary dependencies.

Create a `.env` file in the `server` folder and add your MongoDB connection URI, as well as any other necessary environment variables. Then, run `npm start` in both the `client` and `server` folders to start the development server.

## Features

-   User authentication using JWT tokens and Passport.js
-   Image uploading and management using Cloudinary
-   Responsive design editing with GrapesJS
-   Form building with GrapesJS plugin
-   Basic block library with GrapesJS

## License

This project is licensed under the MIT License - ![NPM](https://img.shields.io/npm/l/express)

