"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const router = express_1.default.Router();
const dbFilePath = './src/db.json';
router.get('/ping', (req, res) => {
    res.send('true');
});
router.post('/submit', (req, res) => {
    const { name, email, phone, github_link } = req.body;
    if (!name || !email || !phone || !github_link) {
        return res.status(400).json({ error: 'Please provide all required fields: name, email, phone, github_link' });
    }
    try {
        console.log("inside file ", dbFilePath);
        let submissions = [];
        if (fs_1.default.existsSync(dbFilePath)) {
            console.log(dbFilePath);
            submissions = JSON.parse(fs_1.default.readFileSync(dbFilePath, 'utf8'));
        }
        const newSubmission = {
            name,
            email,
            phone,
            github_link
        };
        submissions.push(newSubmission);
        fs_1.default.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
        res.status(200).send('Submission saved successfully');
    }
    catch (err) {
        console.error('Error writing to db.json:', err);
        res.status(500).send('Error saving submission');
    }
});
router.get('/read', (req, res) => {
    const indexStr = req.query.index;
    const index = parseInt(indexStr, 10);
    if (isNaN(index)) {
        return res.status(400).json({ error: 'Invalid index parameter. Must be a valid integer.' });
    }
    const submissions = JSON.parse(fs_1.default.readFileSync(dbFilePath, 'utf8'));
    if (index >= 0 && index < submissions.length) {
        res.json(submissions[index]);
    }
    else {
        res.status(404).send('Submission not found');
    }
});
exports.default = router;
