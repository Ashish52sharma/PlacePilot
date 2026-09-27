const express = require("express");
const bcrypt = require("bcrypt");

const db = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    // Check empty fields
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    // Check if email already exists
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "Email already registered"
                });
            }

            // Encrypt password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            db.query(
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
                [name, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        return res.status(500).json({
                            message: "Registration failed"
                        });
                    }

                    res.status(201).json({
                        message: "Registration successful"
                    });
                }
            );
        }
    );
});

router.post("/login", (req, res) => {

    const { email, password } = req.body;

    // Check empty fields
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    // Find user by email
    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database error"
                });
            }

            // User not found
            if (result.length === 0) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            const user = result[0];

            // Compare password
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            res.json({
                message: "Login successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        }
    );
});
module.exports = router;