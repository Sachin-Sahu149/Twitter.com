🐦 twitter-clone
A full-stack Twitter-like application built with the MERN stack (MongoDB, Express, React, Node.js).

🚀 Features
This project aims to replicate core features of a popular microblogging platform, including:

User Authentication: Secure registration, login, and logout using JWT (JSON Web Tokens) and bcryptjs for password hashing.

User Profiles: View, update, and manage user profiles.

Post Creation & Interaction:

Create, view, and delete posts (tweets).

Like/unlike posts.

Following System: Follow and unfollow other users.

Media Uploads: Integrate cloudinary for image and media handling.

🛠️ Tech Stack
This project is built using the following technologies:

Backend (Node.js/Express)
Node.js & Express.js: The runtime environment and web application framework for the server.

MongoDB & Mongoose: The NoSQL database and an ODM (Object Data Modeling) library for simplified data interaction.

Security & Authentication:

bcryptjs: For secure password hashing.

jsonwebtoken: For handling secure, token-based user authentication.

cookie-parser: For parsing and setting cookies (used for authentication tokens).

Utilities:

dotenv: To manage environment variables.

cloudinary: For cloud-based media storage and management.

cors: For enabling Cross-Origin Resource Sharing.

validator: For data validation.

Frontend (React)
Based on the build script, a React application is used for the frontend.

Development Tools
nodemon: For automatically restarting the server during development.

⚙️ Getting Started
Prerequisites
Node.js (LTS version recommended)

MongoDB (local installation or a cloud service like MongoDB Atlas)

Cloudinary Account (for media uploads)

Installation
Clone the repository:

Bash

git clone <repository-url>
cd twitter-clone
Install dependencies for both Backend and Frontend:
The build script handles both:

Bash

npm run build
This command runs npm install in the root, then navigates to the Frontend directory to install and build its dependencies.

Create a .env file in the Backend directory and add your environment variables. Essential variables include:

# MongoDB
MONGO_URI=<Your-MongoDB-Connection-String>

# JWT Secret
JWT_SECRET=<A-Strong-Secret-Key>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<Your-Cloud-Name>
CLOUDINARY_API_KEY=<Your-API-Key>
CLOUDINARY_API_SECRET=<Your-API-Secret>
Running the Application
Development Mode
To run the backend server with hot-reloading (using nodemon):

Bash

npm run dev
The server will start on the port configured in Backend/server.js (e.g., http://localhost:5000).

Production Mode
To run the application in a production environment:

Bash

npm start
📂 Project Structure
The project is organized to separate the backend and frontend codebases:

twitter-clone/
├── Backend/              # Node.js/Express Server
│   ├── config/           # Database connection, etc.
│   ├── controllers/      # Business logic handlers
│   ├── middleware/       # Authentication, error handling
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes definition
│   └── server.js         # Entry point for the server
├── Frontend/             # React Application (if created)
│   ├── src/
│   └── public/
├── package.json          # Root dependencies and scripts
└── README.md             # This file
👤 Author
Sachin Sahu
