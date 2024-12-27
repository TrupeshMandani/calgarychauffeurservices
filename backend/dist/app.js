"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const squareRoutes_1 = __importDefault(require("./routes/squareRoutes")); // Ensure this path is correct and the file exists
// Initialize Express app
const app = (0, express_1.default)();
// Middleware to parse JSON
app.use(express_1.default.json());
// Root route for the API
app.get("/", (req, res) => {
    res.send("Welcome to the Calgary Chauffeur Services API!");
});
// Use routes from squareRoutes
app.use("/api", squareRoutes_1.default);
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
