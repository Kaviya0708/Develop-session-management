const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: true
    })
);

// Login API
app.post("/login", (req, res) => {

    const { username } = req.body;

    req.session.user = username;

    res.json({
        success: true,
        message: "Login Successful",
        user: username
    });
});

// Check Session
app.get("/profile", (req, res) => {

    if (req.session.user) {

        return res.json({
            loggedIn: true,
            user: req.session.user
        });
    }

    res.json({
        loggedIn: false
    });
});

// Logout
app.get("/logout", (req, res) => {

    req.session.destroy();

    res.json({
        success: true,
        message: "Logged Out"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});