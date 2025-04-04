const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  index: { type: Number, required: true },
  status: { type: String, enum: ['green', 'orange', 'red', 'filled'], default: 'green' },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date },
});

const attendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  cycle: { type: Number, required: true, default: 1 },
  slots: [slotSchema],
  totalSlots: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Attendance', attendanceSchema);