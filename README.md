# Online Learning Platform

This guide provides instructions for setting up and running an online learning platform using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system facilitates user registration, login, course management, student management, enrollment management, and provides a user-friendly front-end web application for students. Additionally, it includes API designs for backend services.

## Setting up the Project and MongoDB

1. **Clone the project:**

   ```bash
   git clone https://github.com/ManelkaKodithuwakku/OnlineLearningPlatformBackend.git
   ```

2. Add a `.env` file with the following required fields to set up MongoDB:

   ```env
   DB_HOST=127.0.0.1
   DB_PORT=27017
   DATABASE=online-learning-platform
   JWT_SECRET=<your jwt secrets>
   PORT=8080
   ```

## Install Dependencies

Dependencies are installed by default when the application is generated. If changes are made to `package.json`, install the dependencies with:

```bash
npm install
```

## Running the Application

```bash
npm start
```

## How to create Admin User

### Option 1: Execute Script

1. Install Axios:

   ```bash
   npm install axios
   ```

2. Run the script to create an admin user:

   ```bash
   node --experimental-modules ./src/scripts/create_admin_user.cjs
   ```

### Option 2: Use Postman Curl

Use Postman or any REST client to execute the following curl command to create an admin user:

```bash
curl --location 'http://localhost:8080/api/users/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "Admin",
    "email": "admin@gmail.com",
    "password": "Admin@12345",
    "isAdmin": true
}'
```
