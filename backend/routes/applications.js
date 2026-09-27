const express = require("express");

const db = require("../db");

const router = express.Router();

router.post("/", (req, res) => {

    const {
        user_id,
        company,
        role,
        package_lpa,
        location,
        status,
        applied_date,
        notes
    } = req.body;

    // Check required fields
    if (!user_id || !company || !role) {
        return res.status(400).json({
            message: "User, company and role are required"
        });
    }

    // Insert application
    db.query(
        `INSERT INTO applications
        (user_id, company, role, package_lpa, location, status, applied_date, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            user_id,
            company,
            role,
            package_lpa,
            location,
            status,
            applied_date,
            notes
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to add application"
                });
            }

            res.status(201).json({
                message: "Application added successfully"
            });
        }
    );
});

router.get("/:user_id", (req, res) => {

    const user_id = req.params.user_id;

    db.query(
        "SELECT * FROM applications WHERE user_id = ? ORDER BY id DESC",
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to fetch applications"
                });
            }

            res.json(result);
        }
    );
});

router.delete("/:id", (req, res) => {

    const id = req.params.id;

    db.query(
        "DELETE FROM applications WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to delete application"
                });
            }

            res.json({
                message: "Application deleted successfully"
            });
        }
    );
});

router.put("/:id", (req, res) => {

    const id = req.params.id;

    const {
        company,
        role,
        package_lpa,
        location,
        status,
        applied_date,
        notes
    } = req.body;

    db.query(
        `UPDATE applications
        SET company = ?,
            role = ?,
            package_lpa = ?,
            location = ?,
            status = ?,
            applied_date = ?,
            notes = ?
        WHERE id = ?`,
        [
            company,
            role,
            package_lpa,
            location,
            status,
            applied_date,
            notes,
            id
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Failed to update application"
                });
            }

            res.json({
                message: "Application updated successfully"
            });
        }
    );
});

module.exports = router;