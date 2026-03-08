const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const connectDB = require("./config/db");
connectDB();

const authRoutes    = require("./routes/authRoutes");
const slotRoutes    = require("./routes/slotRoutes");
const templeRoutes  = require("./routes/templeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes   = require("./routes/adminRoutes");
const errorHandler  = require("./middleware/errorMiddleware");

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth",     authRoutes);
app.use("/api/slots",    slotRoutes);
app.use("/api/temples",  templeRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin",    adminRoutes);

// Error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});