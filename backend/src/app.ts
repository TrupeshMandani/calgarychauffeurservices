import express from "express";
import squareRoutes from "./routes/squareRoutes"; // Ensure this path is correct and the file exists

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Root route for the API
app.get("/", (req, res) => {
  res.send("Welcome to the Calgary Chauffeur Services API!");
});

// Use routes from squareRoutes
app.use("/api", squareRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
