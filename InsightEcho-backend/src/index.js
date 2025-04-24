const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Import routes
const csvRoutes = require("./routes/csvUpload");
const reviewRoutes = require("./routes/reviews");
const insightRoutes = require("./routes/insights");

// Connect routes
app.use("/api", csvRoutes);
app.use("/api", reviewRoutes);
app.use("/api", insightRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
