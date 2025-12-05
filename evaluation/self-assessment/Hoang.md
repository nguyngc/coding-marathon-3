## Evaluate the quality and functionality of your code:
    - The code is modular, with separate controllers, models, and routes for user management.
    - All API endpoints follow RESTful principles and return proper HTTP status codes.
    - Passwords are securely hashed using bcrypt, and JWT tokens are used for authentication.
    - Automated tests with Jest and Supertest cover all main functionalities, including error handling, ensuring the code works as expected.
    - Error handling and validation are included, such as checking for invalid IDs, missing fields, or duplicate usernames.

## Discuss challenges faced and how you overcame them:
    - Challenge: Setting up an in-memory MongoDB server for tests to avoid conflicts with the main database.
    - Solution: Used mongodb-memory-server and ensured connections were properly handled and closed in beforeAll/afterAll hooks.

    - Challenge: Handling JWT authentication and protecting routes correctly.
    - Solution: Implemented a custom middleware requireAuth to verify tokens and attach the user to req.user.

## Reflect on what you learned:
    - Learned how to implement secure user authentication using JWT and password hashing.
    - Gained experience in writing comprehensive tests for RESTful APIs with Jest and Supertest.
    - Improved skills in error handling and input validation in Node.js + Express.
    - Learned how to work with MongoDB and Mongoose, including schema design and queries.
    - Developed better understanding of API design, modular code structure, and team collaboration in backend development.