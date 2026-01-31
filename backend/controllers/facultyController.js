const Project = require("../models/Project");

// get all
exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// review
exports.reviewProject = async (req, res) => {
  const project = await Project.findById(req.params.id);

  project.marks = req.body.marks;
  project.remarks = req.body.remarks;
  project.status = req.body.status;

  await project.save();
  res.json(project);
};

// final lock
exports.finalReview = async (req, res) => {
  const project = await Project.findById(req.params.id);

  project.progress = 100;
  project.status = "approved";
  project.locked = true;

  await project.save();
  res.json(project);
};
