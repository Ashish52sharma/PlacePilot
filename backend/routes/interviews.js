const express = require("express");

const db = require("../db");

const router = express.Router();

// Add interview details
router.post("/", (req, res) => {

    const {
        application_id,
        round_name,
        interview_date,
        status,
        notes
    } = req.body;

    if (!application_id || !round_name) {
        return res.status(400).json({
            message: "Application and round name are required"
        });
    }

    db.query(
        `INSERT INTO interviews
        (application_id, round_name, interview_date, status, notes)
        VALUES (?, ?, ?, ?, ?)`,
        [
            application_id,
            round_name,
            interview_date,
            status,
            notes
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to add interview"
                });
            }

            res.status(201).json({
                message: "Interview details added successfully"
            });
        }
    );
});
// Get interview details
router.get("/:application_id", (req, res) => {

    const application_id = req.params.application_id;

    db.query(
        "SELECT * FROM interviews WHERE application_id = ? ORDER BY id DESC",
        [application_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to fetch interview details"
                });
            }

            res.json(result);
        }
    );
});
// Update interview details
router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        round_name,
        interview_date,
        status,
        notes
    } = req.body;

    db.query(
        `UPDATE interviews
        SET round_name = ?,
            interview_date = ?,
            status = ?,
            notes = ?
        WHERE id = ?`,
        [
            round_name,
            interview_date,
            status,
            notes,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to update interview details"
                });
            }

            res.json({
                message: "Interview details updated successfully"
            });
        }
    );
});
// Delete interview
router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM interviews WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to delete interview"
                });
            }

            res.json({
                message: "Interview deleted successfully"
            });
        }
    );
});

module.exports = router;