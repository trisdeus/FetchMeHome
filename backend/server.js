const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const session = require("express-session");

const adminRouter = require("./routes/adminRouter");
const adoptionRequestRouter = require("./routes/adoptionRequestRouter");
const adoptPetListingRouter = require("./routes/adoptPetListingRouter");
const banRouter = require("./routes/banRouter");
const emailVerificationRouter = require("./routes/emailVerificationRouter");
const findingRequestRouter = require("./routes/findingRequestRouter");
const listingFlagRouter = require("./routes/listingFlagRouter");
const lostPetListingRouter = require("./routes/lostPetListingRouter");
const phoneVerificationRouter = require("./routes/phoneVerificationRouter");
const removalRouter = require("./routes/removalRouter");
const userFlagRouter = require("./routes/userFlagRouter");
const userRouter = require("./routes/userRouter");

// Connect to Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

// Express App
const app = express();
app.use(express.json());

// This middleware function sets HTTP headers to enable Cross-Origin Resource Sharing (CORS) for your API.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// This middleware function sets up a session for the user.
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);

// Serve static files from the "uploads" folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/admin", adminRouter);
app.use("/api/adoptionRequests", adoptionRequestRouter);
app.use("/api/adoptPetListings", adoptPetListingRouter);
app.use("/api/bans", banRouter);
app.use("/api/emailVerification", emailVerificationRouter);
app.use("/api/findingRequests", findingRequestRouter);
app.use("/api/listingFlags", listingFlagRouter);
app.use("/api/lostPetListings", lostPetListingRouter);
app.use("/api/phoneVerification", phoneVerificationRouter);
app.use("/api/removals", removalRouter);
app.use("/api/userFlags", userFlagRouter);
app.use("/api/users", userRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
