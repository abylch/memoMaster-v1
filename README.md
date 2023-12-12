# memoMaster-v1

MemoMaster is a simple full-stack MERN (MongoDB, Express.js, React, Node.js) web application for managing notes. It allows users to create, edit, and delete notes while providing a seamless and responsive user interface.

MERN Stack is a JavaScript Stack that is used for easier and faster deployment of full-stack web applications. MERN Stack comprises of 4 technologies namely: MongoDB, Express, React and Node. js. It is designed to make the development process smoother and easier.

## Technologies Used

- **Frontend:**
  - **React**
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/React_Logo_SVG.svg" width="124px" height="124px">

  - **Material-UI for styling**
  <img src="https://mui.com/static/logo.png" width="124px" height="124px">

  - **Axios for handling HTTP requests**
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Axios_%28computer_library%29_logo.svg" width="124px" height="124px">

  - **JavaScript**
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" width="124px" height="124px">

  - **css**
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" width="124px" height="124px">

- **Backend:**
  - **MongoDB**
  <img src="https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" width="124px" height="124px">

  - **NodeJs**
  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width="124px" height="124px">

  - **Express**
  <img src = "https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png" width = "60px" height = "60px">

  - **JWT (JSON Web Tokens)**
  <img src = "https://cdn.worldvectorlogo.com/logos/jwt-3.svg" width = "60px" height = "60px">

  - **bcrypt**
  <img src = "https://assets-global.website-files.com/60658b47b03f0c77e8c14884/6256965282e9d1a5a5df6841_Password%20Hashing.png" width = "60px" height = "60px">

  - **dotenv**
  <img src = "https://raw.githubusercontent.com/motdotla/dotenv/master/dotenv.svg" width = "60px" height = "60px">

  - **mongoose**
  <img src = "https://mongoosejs.com/docs/images/mongoose5_62x30_transparent.png" width = "60px" height = "60px">

## Components

- **Header:**
  - Displays the application title, a Tips and Updates icon, welcome header, now time and a Logout button after login event success.

- **Footer:**
  - Displays a simple footer for the web application.

- **Note:**
  - Represents a single note with title, content, time note created, and a delete button.

- **CreateArea:**
  - Allows users to create new notes by entering a title and content.

- **Login:**
  - Provides a login form for users to authenticate themselves.

- **Register:**
  - Offers a registration form for new users to create an account.

- **App:**
  - Main component handling routing and rendering of other components.
  - Manages user authentication, notes retrieval, and user-related operations.

## Installation

### Server Side

1. Navigate to the `server` directory.

    ```bash
    cd server
    ```

2. Install dependencies using npm.

    ```bash
    npm install
    ```

3. Start the server using nodemon.

    ```bash
    nodemon app.js
    ```

### Frontend Side

1. Navigate to the `client` directory.

    ```bash
    cd client
    ```

2. Install frontend dependencies using npm.

    ```bash
    npm install
    ```

3. Start the frontend development server.

    ```bash
    npm start
    ```

4. Open your browser and visit `http://localhost:3001` to use the MemoMaster web app.

## Usage

- If you are a new user, click on the "Create Account" link on the login page to register.
- Once registered or if you already have an account, log in using your credentials.
- Create, edit, and delete notes using the MemoMaster web app.

## Contributors

Feel free to contribute, report issues, or provide feedback!
