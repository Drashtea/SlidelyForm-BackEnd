// src/app.ts

import express from 'express';
import bodyParser from 'body-parser';
import apiRouter from './routes/index';

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', apiRouter); // Assuming '/api' prefix for all API routes

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
