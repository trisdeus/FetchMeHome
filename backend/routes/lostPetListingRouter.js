const express = require("express");
const lostPetListingRouter = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const requireAdmin = require("../middlewares/requireAdmin");
const {
  getLostPetListings,
  getLostPetListing,
  getLostPetListingsByOwner,
  createLostPetListing,
  editLostPetListing,
  updateLostPetListingStatus,
  flagLostPetListing,
  removeLostPetFlag,
  addLostRequest,
  removeLostRequest,
  removeLostPetListing,
  deleteLostPetListing,
} = require("../controllers/lostPetListingController");

lostPetListingRouter.use(requireAuth);

lostPetListingRouter.get("/", getLostPetListings);
lostPetListingRouter.get("/:id", getLostPetListing);
lostPetListingRouter.get("/owner/:owner", getLostPetListingsByOwner);
lostPetListingRouter.post("/", createLostPetListing);
lostPetListingRouter.put("/", editLostPetListing);
lostPetListingRouter.put("/status", updateLostPetListingStatus);
lostPetListingRouter.put("/flag", flagLostPetListing);
lostPetListingRouter.put("/removeFlag", removeLostPetFlag);
lostPetListingRouter.put("/addRequest", addLostRequest);
lostPetListingRouter.put("/removeRequest", removeLostRequest);
lostPetListingRouter.patch("/:id", updateLostPetListing);
lostPetListingRouter.delete("/:id", deleteLostPetListing);

lostPetListingRouter.use(requireAdmin);

lostPetListingRouter.put("/remove", removeLostPetListing);

module.exports = lostPetListingRouter;
