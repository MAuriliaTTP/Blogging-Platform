Blogging Platform

This is a simple blogging platform application built with Node.js and Express.js. It allows users to register, login, create posts, and add comments to posts.

Features
User registration: Users can create an account by providing a unique username, email, and password.
User login: Existing users can log in with their credentials.
Create posts: Logged-in users can create new blog posts by providing a title and content.
Add comments: Users can add comments to existing posts.
View posts: Users can view all posts on the platform.
View comments: Users can view comments associated with a specific post.
Prerequisites
Before running the application, make sure you have the following prerequisites installed:

Node.js
npm (Node Package Manager)
PostgreSQL database
Getting Started
Clone the repository:
git clone https://github.com/your-username/blogging-platform.git
Install dependencies:
cd blogging-platform
npm install
Set up the database:

Create a new PostgreSQL database.
Update the database connection details in the config/database.js file.
Run the database migration to set up the necessary tables:
npx sequelize-cli db:migrate
Set environment variables:

Create a .env file in the root directory.
Define the following environment variables in the .env file:
makefile
SESSION_SECRET=your_session_secret
Start the application:

npm start
Access the application in your web browser at http://localhost:3000.
API Endpoints
POST /auth/register: Register a new user.
POST /auth/login: Log in an existing user.
GET /api/posts: Retrieve all posts.
POST /api/posts: Create a new post.
GET /api/comments/post/:id: Retrieve comments for a specific post.
POST /api/comments: Create a new comment.
GET /api/comments/:id: Retrieve a specific comment.
PUT /api/comments/:id: Update a comment.
DELETE /api/comments/:id: Delete a comment.
