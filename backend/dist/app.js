"use strict";
// import express from "express";
// import cors from "cors";
// import squareRoutes from "./routes/squareRoutes"; // Ensure this file exists and is correct
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // Initialize Express app
// const app = express();
// // Middleware
// app.use(cors({
//   origin: "http://localhost:3001", // Your frontend URL
//   optionsSuccessStatus: 200,
// }));
// // Enables cross-origin requests
// app.use(express.json());
// // Root route for the API
// app.get("/", (req, res) => {
//   res.send("Welcome to the Calgary Chauffeur Services API!");
// });
// // Test route to verify backend connectivity
// app.get("/api/test", (req, res) => {
//   res.json({ message: "Backend is working!" });
// });
// // Use routes from squareRoutes
// app.use("/api", squareRoutes);
// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const squareRoutes_1 = __importDefault(require("./routes/squareRoutes")); // Ensure this file exists and is correct
// Initialize Express app
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
// Enables cross-origin requests
app.use(express_1.default.json());
// Root route for the API
app.get("/", (req, res) => {
    res.send("Welcome to the Calgary Chauffeur Services API!");
});
// Test route to verify backend connectivity
app.get("/api/test", (req, res) => {
    res.json({ message: "Backend is working!" });
});
// Use routes from squareRoutes
app.use("/api", squareRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
