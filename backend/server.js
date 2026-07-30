// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const expenseRoutes = require("./routes/expenseRoutes");

// const app = express();

// // Connect to MongoDB
// connectDB();

// // ====================
// // Middleware
// // ====================

// // Allow multiple origins (comma-separated in .env)
// const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
//   .split(",")
//   .map((origin) => origin.trim());

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (Postman, mobile apps, server-to-server)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   }),
// );

// app.use(express.json());

// // ====================
// // Routes
// // ====================

// app.get("/", (req, res) => {
//   res.json({ message: "Expense Tracker API is running" });
// });

// app.use("/api/expenses", expenseRoutes);

// // ====================
// // 404 Handler
// // ====================

// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// // ====================
// // Global Error Handler
// // ====================

// app.use((err, req, res, next) => {
//   console.error(err);

//   if (err.name === "ValidationError") {
//     const messages = Object.values(err.errors).map((val) => val.message);

//     return res.status(400).json({
//       success: false,
//       message: messages.join(", "),
//     });
//   }

//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || "Server Error",
//   });
// });

// // ====================
// // Start Server
// // ====================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const expenseRoutes = require("./routes/expenseRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// ====================
// Middleware
// ====================

// Allowed frontend origins (comma-separated in .env)
const allowedOrigins = (process.env.CLIENT_ORIGIN || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""));

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no Origin (React Native, Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      console.log(`Blocked by CORS: ${normalizedOrigin}`);

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());

// ====================
// Routes
// ====================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Expense Tracker API is running",
  });
});

app.use("/api/expenses", expenseRoutes);

// ====================
// 404 Handler
// ====================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ====================
// Global Error Handler
// ====================

app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);

    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ====================
// Start Server
// ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
