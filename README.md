# SlidelyForm-BackEnd
Express TypeScript Backend Project
Welcome to the Express TypeScript Backend Project! This project serves as a backend API for handling form submissions, built using Express.js with TypeScript.

Features
Ping Endpoint: /ping - A GET request that returns "true" to indicate server availability.
Submit Endpoint: /submit - A POST request to save form submissions with parameters: name, email, phone, github_link.
Read Endpoint: /read - A GET request with a query parameter index to retrieve saved submissions based on a 0-index.
Prerequisites
Before you begin, ensure you have the following installed on your local development machine:

Node.js (v12 or higher)
npm or yarn package manager
TypeScript
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/your-repo.git
cd your-repo
Install dependencies:

bash
Copy code
npm install
Running the Server
Compile TypeScript to JavaScript:

bash
Copy code
npm run build
Start the server:

bash
Copy code
npm start
The server should now be running locally on http://localhost:3000.

Usage
Ping Endpoint
Endpoint: GET /ping
Description: Returns "true" to indicate server availability.
Submit Endpoint
Endpoint: POST /submit
Parameters:
name (string): Name of the submitter.
email (string): Email address of the submitter.
phone (string): Phone number of the submitter.
github_link (string): GitHub repository link of the submitter.
Description: Saves a form submission to the database.
Read Endpoint
Endpoint: GET /read
Query Parameter:
index (number): Index of the submission to retrieve (0-indexed).
Description: Retrieves a specific form submission based on the index provided.
Contributing
Contributions are welcome! If you want to contribute to this project, follow these steps:

Fork the repository on GitHub.
Create a new branch (git checkout -b feature/my-feature).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature/my-feature).
Create a new Pull Request.
