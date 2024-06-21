// src/routes/index.ts

import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
const dbFilePath = path.join(__dirname, 'db.json');

// Ping endpoint
router.get('/ping', (req: Request, res: Response) => {
  res.send('true');
});

// Submit endpoint
router.post('/submit', (req, res) => {
  const { name, email, phone, github_link } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !github_link) {
    return res.status(400).json({ error: 'Please provide all required fields: name, email, phone, github_link' });
  }

  try {
    console.log("inside file ",dbFilePath);
    // Read existing submissions from db.json, if it exists
    let submissions = [];
    if (fs.existsSync(dbFilePath)) {
      console.log(dbFilePath);
      submissions = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    }

    // Create new submission object
    const newSubmission = {
      name,
      email,
      phone,
      github_link
    };

    // Add new submission to submissions array
    submissions.push(newSubmission);

    // Write updated submissions array back to db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));

    res.status(200).send('Submission saved successfully');
  } catch (err) {
    console.error('Error writing to db.json:', err);
    res.status(500).send('Error saving submission');
  }
});

// Read endpoint
router.get('/read', (req: Request, res: Response) => {
  const indexStr = req.query.index as string; // Ensure index is treated as string
  const index = parseInt(indexStr, 10); // Parse index as integer

  if (isNaN(index)) {
    return res.status(400).json({ error: 'Invalid index parameter. Must be a valid integer.' });
  }

  const submissions: any[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).send('Submission not found');
  }
});

export default router;
