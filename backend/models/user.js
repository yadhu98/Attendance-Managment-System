const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['admin', 'teacher', 'student'], required: true },
  name: { type: String, required: true, index: true }, // Indexed for search
  username: { type: String, unique: true, sparse: true }, // Sparse for teachers in Phase 1
  password: { type: String },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  registrationFee: { type: Number }, // Students only
  feeStatus: { type: String, enum: ['paid', 'due'] },
  totalDue: { type: Number, default: 0 },
  salaryStatus: { type: String, enum: ['paid', 'pending'] }, // Teachers only
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);