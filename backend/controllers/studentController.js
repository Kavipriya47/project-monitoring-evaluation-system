const Project = require("../models/Project");

// submit project (ALLOW MULTIPLE)
exports.submitProject = async (req, res) => {
  const { studentEmail, title } = req.body;

  // 🔒 prevent duplicate project
  const exists = await Project.findOne({
    studentEmail,
    title
  });

  if (exists) {
    return res.status(400).json({
      message: "You already submitted this project"
    });
  }

  const project = new Project({
    ...req.body,
    status: "pending",
    progress: 10,
    locked: false,
    marks: 0
  });

  await project.save();
  res.json(project);
};


// get ALL projects of student
exports.getMyProjects = async (req, res) => {
  const projects = await Project.find({
    studentEmail: req.params.email
  }).sort({ createdAt: -1 });

  res.json(projects);
};

// update stage
exports.updateStage = async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (project.locked) {
    return res.status(403).json({ message: "Project locked by faculty" });
  }

  const stageMap = {
    Designing: 10,
    Database: 30,
    Frontend: 50,
    Backend: 70,
    Deployment: 100
  };

  project.stage = req.body.stage;
  project.progress = stageMap[req.body.stage];

  await project.save();
  res.json(project);
};
