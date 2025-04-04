const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const auth = require('../middleware/auth');

// Create a course (Admin only)
router.post('/', auth(['admin']), async (req, res) => {
  const { name, fees, slotsPerCycle } = req.body;

  try {
    const course = new Course({
      name,
      fees,
      slotsPerCycle,
    });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all courses (Admin, Teacher, Student)
router.get('/', auth(['admin', 'teacher', 'student']), async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single course by ID (Admin, Teacher, Student)
router.get('/:id', auth(['admin', 'teacher', 'student']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a course (Admin only)
router.put('/:id', auth(['admin']), async (req, res) => {
  const { name, fees, slotsPerCycle } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.name = name || course.name;
    course.fees = fees || course.fees;
    course.slotsPerCycle = slotsPerCycle || course.slotsPerCycle;
    course.updatedAt = Date.now();

    await course.save();
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a course (Admin only)
router.delete('/:id', auth(['admin']), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    await course.remove();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;