import express from "express";
import cors from "cors";
import squareRoutes from "./routes/squareRoutes";
import notificationRoutes from "./routes/notificationRoutes"; // Ensure this file exists and is correct
import helpRequestRoutes from "./routes/helpRequestRoutes";
const app = express();

// Middleware
app.use(cors());
// Enables cross-origin requests
app.use(express.json({ limit: "5mb" }));

// Root route for the API
app.get("/", (req, res) => {
  res.send("Welcome to the Calgary Chauffeur Services API!");
});

// Test route to verify backend connectivity
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

// Use routes from squareRoutes
app.use("/api", squareRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/help", helpRequestRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
