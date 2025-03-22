const express = require("express");
const adoptPetListingRouter = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");
const {
  getAdoptPetListings,
  getAdoptPetListing,
  getAdoptPetListingsByOwner,
  createAdoptPetListing,
  editAdoptPetListing,
  updateAdoptPetListingStatus,
  flagAdoptPetListing,
  removeAdoptPetFlag,
  addAdoptRequest,
  removeAdoptRequest,
  removeAdoptPetListing,
  deleteAdoptPetListing,
} = require("../controllers/adoptPetListingController");

adoptPetListingRouter.use(requireAuth);

adoptPetListingRouter.get("/", getAdoptPetListings);
adoptPetListingRouter.get("/:id", getAdoptPetListing);
adoptPetListingRouter.get("/owner/:owner", getAdoptPetListingsByOwner);
adoptPetListingRouter.post("/", createAdoptPetListing);
adoptPetListingRouter.put("/", editAdoptPetListing);
adoptPetListingRouter.put("/status", updateAdoptPetListingStatus);
adoptPetListingRouter.put("/flag", flagAdoptPetListing);
adoptPetListingRouter.put("/removeFlag", removeAdoptPetFlag);
adoptPetListingRouter.put("/addRequest", addAdoptRequest);
adoptPetListingRouter.put("/removeRequest", removeAdoptRequest);
adoptPetListingRouter.delete("/:id", deleteAdoptPetListing);

adoptPetListingRouter.use(requireAdmin);

adoptPetListingRouter.put("/remove", removeAdoptPetListing);

module.exports = adoptPetListingRouter;
