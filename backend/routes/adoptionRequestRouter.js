const express = require("express");
const adoptionRequestRouter = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
  getAdoptionRequest,
  createAdoptionRequest,
  updateAdoptionRequest,
  editAdoptionRequest,
  deleteAdoptionRequest,
} = require("../controllers/adoptionRequestController");

adoptionRequestRouter.use(requireAuth);

adoptionRequestRouter.get("/", (req, res) => {
  res.send("Adoption Request Router");
});
adoptionRequestRouter.get("/:id", getAdoptionRequest);
adoptionRequestRouter.post("/", createAdoptionRequest);
adoptionRequestRouter.patch("/update/:id", updateAdoptionRequest);
adoptionRequestRouter.patch("/edit/:id", editAdoptionRequest);
adoptionRequestRouter.delete("/:id", deleteAdoptionRequest);

module.exports = adoptionRequestRouter;
