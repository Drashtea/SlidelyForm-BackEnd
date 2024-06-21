/**
 * Setup express server.
 */

import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';

import 'express-async-errors'; // For handling async errors

import BaseRouter from '@src/routes'; // Assuming this is your router

// Constants and Environment Variables
import { NodeEnvs } from '@src/common/misc'; // Assuming NodeEnvs is defined here

const app = express();
const PORT = process.env.PORT || 3000; // Port for the server to listen on

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET || 'mysecret'));


// Development logging
if (process.env.NODE_ENV === NodeEnvs.Dev.valueOf()) {
  app.use(morgan('dev'));
}

// Production security headers
if (process.env.NODE_ENV === NodeEnvs.Production.valueOf()) {
  app.use(helmet());
}

// Routes
app.use('/api', BaseRouter); // Assuming BaseRouter handles routes starting with '/api'

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV !== NodeEnvs.Test.valueOf()) {
    console.error(err.stack); // Log the error stack trace
  }
  res.status(500).json({ error: 'Internal Server Error' });
});

// Serve static files (e.g., HTML, JS, CSS)
const viewsDir = path.join(__dirname, 'views'); // Directory for HTML views
app.set('views', viewsDir);

const staticDir = path.join(__dirname, 'public'); // Directory for static files (JS, CSS)
app.use(express.static(staticDir));

// Default route
app.get('/', (req: Request, res: Response) => {
  res.redirect('/users'); // Redirect to '/users'
});

// Sample route to serve users.html
app.get('/users', (req: Request, res: Response) => {
  res.sendFile('users.html', { root: viewsDir });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app; // Export app for testing or further integration
