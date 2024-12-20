# Todo List

A simple Todo-List application built with Node.js, Express, MongoDB, and JWT authentication.

## Installation

Follow these steps to set up and run the application:

1. Clone the repository:
   ```bash
   git clone https://github.com/stablelane/todo-list.git
   cd todo-list
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up MongoDB:
   - Ensure MongoDB is installed and running on your local machine.
   - Use the default `mongodb://localhost/taskdb` URL for the database.

4. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     JWT_SECRET=your_jwt_secret_key
     PORT=5000
     ```

5. Start the application:
   ```bash
   npm run devStart
   ```

6. Access the app:
   - Open your browser and go to `http://localhost:5000` (or the specified PORT if provided in the environment variables).

## Features

- **User Authentication:**
  - User registration and login with JWT-based authentication.
  - Passwords are securely hashed using bcrypt.
  - JWT tokens are used for securing routes and are saved in `localStorage`.

- **Task Management:**
  - Add new tasks.
  - View all tasks associated with the authenticated user.
  - Update task completion status.
  - Delete tasks.

## Requirements

- Node.js
- MongoDB

