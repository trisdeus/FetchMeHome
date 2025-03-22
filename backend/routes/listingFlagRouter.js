const express = require("express");
const listingFlagRouter = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
  flagListing,
  removeFlag,
} = require("../controllers/listingFlagController");

listingFlagRouter.use(requireAuth);

listingFlagRouter.get("/", (req, res) => {
  res.send("Listing flag router");
});
listingFlagRouter.post("/", flagListing);
listingFlagRouter.delete("/:id", removeFlag);

module.exports = listingFlagRouter;
