# 🐦 Twitter Clone

A full-stack social media platform, built as a clone of Twitter, using the **MERN stack** (MongoDB, Express, React, Node.js).

## 🚀 Features

* **User Authentication:** Secure registration, login, and logout using JWT and `bcryptjs`.
* **User Profiles:** View and manage user profiles.
* **Posting:** Create, view, and delete posts (tweets).
* **Interaction:** Like/unlike posts.
* **Following:** Follow and unfollow other users.
* **Media:** Image and media handling using **`cloudinary`**.

---

## 🛠️ Tech Stack

This project is built using:

| Category | Key Technologies |
| :--- | :--- |
| **Backend** | Node.js, Express, Mongoose, MongoDB |
| **Authentication** | `jsonwebtoken`, `bcryptjs`, `cookie-parser` |
| **Utilities** | `dotenv`, `cors`, `validator` |
| **Dev Tools** | `nodemon` |

---

## ⚙️ Getting Started

### Installation

1.  **Clone the repository.**
2.  **Install all dependencies and build the frontend:**

    ```bash
    npm run build
    ```
    *(This command runs `npm install` in the root, then runs `npm install --prefix Frontend` and `npm run build --prefix Frontend`)*

3.  **Create a `.env` file** in the `Backend` directory for configuration variables (e.g., `MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_CLOUD_NAME`).

### Running the Project

| Command | Environment | Description |
| :--- | :--- | :--- |
| `npm run dev` | **Development** | Starts the backend server with `nodemon` for automatic restarts. |
| `npm start` | **Production** | Runs the application in a production environment (`NODE_ENV=production`). |

---

## 👤 Author

**Sachin Sahu**
