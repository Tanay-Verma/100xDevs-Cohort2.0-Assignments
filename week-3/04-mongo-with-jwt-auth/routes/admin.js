const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) return res.sendStatus(403);
  await Admin.create({ username, password });
  return res.json({ message: "Admin created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (!admin) return res.sendStatus(404);
  const jwtToken = jwt.sign({ adminId: admin._id }, "secret");
  return res.json({ token: jwtToken });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const { title, description, imageLink, price } = req.body;
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price,
  });
  res.json({ message: "Course created successfully", courseId: newCourse._id });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const allCourses = await Course.find({});
  res.json({ courses: allCourses });
});

module.exports = router;
