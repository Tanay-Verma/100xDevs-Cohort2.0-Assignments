const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) return res.sendStatus(403);
  await User.create({ username, password });
  return res.json({ message: "User created successfully" });
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) return res.sendStatus(404);
  const jwtToken = jwt.sign({ userId: user._id }, "secret");
  return res.json({ token: jwtToken });
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const allCourses = await Course.find({});
  res.json({ courses: allCourses });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  await Course.updateOne(
    { _id: req.params.courseId },
    {
      $set: { purchased: true },
    }
  );

  res.json({ message: "Course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const purchasedCourses = await Course.find({ purchased: true });
  res.json({ purchasedCourses });
});

module.exports = router;
