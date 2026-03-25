const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

/* ROUTES IMPORT */

const authRoutes = require("./routes/authRoutes");
const healthRoutes = require("./routes/healthRoutes.js");
const profileRoutes = require("./routes/profileRoutes");
const reportRoutes = require("./routes/reportRoutes");
const waterRoutes = require("./routes/waterRoutes");
const heartRateRoutes = require("./routes/heartRateRoutes");
const temperatureRoutes = require("./routes/temperatureRoutes");
const sleepRoutes = require("./routes/sleepRoutes");
const stepsRoutes = require("./routes/stepsRoutes");
const moodRoutes = require("./routes/moodRoutes");
const calorieRoutes = require("./routes/calorieRoutes");
const profilesRoutes = require("./routes/profilesRoutes");
const bloodSugarRoutes = require("./routes/bloodSugarRoutes");
const bloodPressureRoutes = require("./routes/bloodPressureRoutes");
const app = express();

/* CONNECT DATABASE */

connectDB();

/* MIDDLEWARE */

app.use(cors());
app.use(express.json());

/* ROUTES */

app.use("/api/auth", authRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/water", waterRoutes);
app.use("/api/heartrate", heartRateRoutes);
app.use("/api/temperature", temperatureRoutes);
app.use("/api/sleep", sleepRoutes);
app.use("/api/steps", stepsRoutes);
app.use("/api/mood", moodRoutes);
app.use("/api/calories", calorieRoutes);
app.use("/api/profile", profilesRoutes);
app.use("/api/bloodsugar", bloodSugarRoutes);
app.use("/api/bloodpressure", bloodPressureRoutes);
/* TEST ROUTE */

app.get("/", (req, res) => {
  res.send("Smart Health Backend Running");
});

/* SERVER */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});