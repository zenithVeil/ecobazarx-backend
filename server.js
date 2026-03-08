const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const protect = require("./middleware/authMiddleware");

app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);
app.use('/api/recommendations', recommendationRoutes);

const recommendationRoutes = require('./routes/recommendationRoutes');

app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);