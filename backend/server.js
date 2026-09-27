const express = require("express");
const cors = require("cors");
const db = require("./db");
const authRoutes = require("./routes/auth");
const applicationRoutes = require("./routes/applications");
const preparationRoutes = require("./routes/preparation");
const interviewRoutes = require("./routes/interviews");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/preparation", preparationRoutes);
app.use("/api/interviews", interviewRoutes);

app.get("/", (req, res) => {
    res.send("PlacePilot Backend is Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});