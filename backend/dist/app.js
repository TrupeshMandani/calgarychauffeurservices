const express = require("express");
const dotenv = require("dotenv");
const squareRoutes = require("./routes/squareRoutes");

// Load environment variables
dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Calgary Chauffeur Services API!");
});

app.use("/api", squareRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found." });
});

app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.message || err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
