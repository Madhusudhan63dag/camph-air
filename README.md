# Camph Air - E-commerce React App

This project is a React-based e-commerce application for Camph Air products with integrated API backend.

## Prerequisites

Make sure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000
```

### 2. Backend API Setup

First, start the backend API:
```bash
cd d:\ISN\camph\camph-air_api
npm install
npm start
```

The API will run on `http://localhost:5000`

### 3. Frontend Setup

In the project directory, install dependencies and start the development server:
```bash
npm install
npm start
```

The app will run on `http://localhost:3000`

## API Integration

The application integrates with the following API endpoints:

- **POST /send-email** - Send contact form emails
- **POST /send-order-confirmation** - Send order confirmation emails  
- **POST /send-abandoned-order-email** - Send abandoned cart emails
- **POST /create-order** - Create Razorpay orders
- **POST /verify-payment** - Verify Razorpay payments

## Features

- Product catalog with detailed views
- Shopping cart functionality
- Checkout process with form validation
- Payment integration with Razorpay
- Cash on Delivery (COD) support
- Order confirmation emails
- Abandoned cart recovery emails
- Responsive design

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
