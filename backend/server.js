const express = require('express');
const Course = require('./models/course');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Attendance Management System Backend');
});

app.get('/test-course', async (req, res) => {
    try {
      const course = new Course({ name: 'Test Course', fees: 1000, slotsPerCycle: 5 });
      await course.save();
      res.json(course);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
