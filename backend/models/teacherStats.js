const mongoose = require('mongoose');

const teacherStatsSchema = new mongoose.Schema({
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  classesTaught: { type: Number, default: 0 },
  studentsTaught: { type: Number, default: 0 },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  period: { type: String, required: true }, // e.g., "April 2025"
  salaryAmount: { type: Number },
  salaryStatus: { type: String, enum: ['paid', 'pending'], default: 'pending' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TeacherStats', teacherStatsSchema);