const router = require("express").Router();
const {
  submitProject,
  getMyProjects,
  updateStage
} = require("../controllers/studentController");

router.post("/submit", submitProject);
router.get("/my/:email", getMyProjects);
router.put("/update/:id", updateStage);


module.exports = router;
