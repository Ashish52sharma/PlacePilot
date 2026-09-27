const express = require("express");

const db = require("../db");

const router = express.Router();


// Add preparation topic
router.post("/", (req, res) => {

    const {
        user_id,
        topic,
        category
    } = req.body;

    if (!user_id || !topic || !category) {
        return res.status(400).json({
            message: "User, topic and category are required"
        });
    }

    db.query(
        `INSERT INTO preparation
        (user_id, topic, category)
        VALUES (?, ?, ?)`,
        [
            user_id,
            topic,
            category
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to add preparation topic"
                });
            }

            res.status(201).json({
                message: "Preparation topic added successfully"
            });
        }
    );
});

// Get preparation topics
router.get("/:user_id", (req, res) => {

    const user_id = req.params.user_id;

    db.query(
        "SELECT * FROM preparation WHERE user_id = ? ORDER BY id DESC",
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to fetch preparation topics"
                });
            }

            res.json(result);
        }
    );
});
// Mark preparation topic as completed
router.put("/:id", (req, res) => {

    const id = req.params.id;
    const { completed } = req.body;

    db.query(
        "UPDATE preparation SET completed = ? WHERE id = ?",
        [completed, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to update preparation topic"
                });
            }

            res.json({
                message: "Preparation topic updated successfully"
            });
        }
    );
});
// Delete preparation topic
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM preparation WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to delete preparation topic"
                });
            }

            res.json({
                message: "Preparation topic deleted successfully"
            });
        }
    );
});

module.exports = router;