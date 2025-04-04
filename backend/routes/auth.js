const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  console.log('Register request received:', req.body);
  const { role, name, username, password, courses, registrationFee } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: 'Username already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      role,
      name,
      username,
      password: hashedPassword,
      courses,
      registrationFee,
      feeStatus: registrationFee ? 'due' : 'paid',
      totalDue: registrationFee || 0,
    });

    await user.save();
    console.log('User saved:', user);

    res.status(201).json({ user: { id: user._id, role, name } });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { id: user._id, role: user.role, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;