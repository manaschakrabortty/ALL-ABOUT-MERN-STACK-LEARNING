const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Array to store user data
const USERS = [];

// Array to store questions
const QUESTIONS = [
    {
        title: "Two states",
        description: "Given an array, return the maximum of the array?",
        testCases: [
            {
                input: "[1,2,3,4,5]",
                output: "5",
            },
        ],
    },
];

// Array to store submissions
const SUBMISSION = [];

// Route for user signup
app.post('/signup', function (req, res) {
    const { email, password } = req.body; // Decode request body

    // Check if user already exists
    const userExists = USERS.find(user => user.email === email);
    if (userExists) {
        return res.status(400).send("User already exists!");
    }

    // Add new user to USERS array
    USERS.push({ email, password });
    res.status(200).send("User signed up successfully!");
});

// Route for user login
app.post('/login', function (req, res) {
    const { email, password } = req.body; // Decode request body

    // Check if user exists
    const user = USERS.find(user => user.email === email);
    if (!user) {
        return res.status(400).send("User not found!");
    }

    // Check if password matches
    if (user.password === password) {
        const token = "randomToken123"; // Generate a token (placeholder)
        return res.status(200).json({ message: "Login successful!", token });
    } else {
        return res.status(401).send("Invalid password!");
    }
});

// Route to get all questions
app.get('/questions', function (req, res) {
    res.status(200).json(QUESTIONS); // Return all questions
});

// Route to get submissions
app.get('/submissions', function (req, res) {
    res.status(200).json(SUBMISSION); // Return all submissions
});

// Route to post a submission
app.post('/submissions', function (req, res) {
    const { problem, solution } = req.body;

    // Randomly accept or reject the solution
    const isAccepted = Math.random() > 0.5;

    // Add the submission to the SUBMISSION array
    SUBMISSION.push({ problem, solution, isAccepted });
    res.status(200).json({ message: "Submission recorded!", isAccepted });
});

// Route for admin to add a new problem (restricted access)
app.post('/admin/add-problem', function (req, res) {
    const { adminToken, title, description, testCases } = req.body;

    // Simple admin authentication
    if (adminToken !== "admin123") {
        return res.status(403).send("Unauthorized access!");
    }

    // Add the new problem to the QUESTIONS array
    QUESTIONS.push({ title, description, testCases });
    res.status(200).send("Problem added successfully!");
});

// Start the server
app.listen(port, function () {
    console.log(`Server is running on port ${port}`);
});
