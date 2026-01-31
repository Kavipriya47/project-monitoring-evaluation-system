const router = require("express").Router();
const {
  getProjects,
  reviewProject,
  finalReview
} = require("../controllers/facultyController");

router.get("/projects", getProjects);
router.put("/review/:id", reviewProject);
router.put("/final/:id", finalReview);

module.exports = router;
