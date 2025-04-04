const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true }, // Indexed for search
  type: { type: String, enum: ['registration', 'course', 'both'], required: true },
  courseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  discount: { type: Number, required: true },
  isPercentage: { type: Boolean, default: false },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Coupon', couponSchema);