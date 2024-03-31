# Online Learning Platform

```diff
- **Note: This project is still under development.**
- DUE TO: Pre-planned weekend activities
```

A simple Online learning platform using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system allows users to register, login, and view their profiles. JWT (JSON Web Tokens) are used to maintain user authentication.

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

```diff
- **Warning: This version only includes functionalities for student registration and course enrollment. Other features are still under development.**
```
