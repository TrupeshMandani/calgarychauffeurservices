import express from "express";
import squareRoutes from "./routes/squareRoutes";

const app = express();
app.use(express.json());

app.use("/api", squareRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
