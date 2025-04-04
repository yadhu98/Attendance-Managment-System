const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inviteCode: { type: String, required: true, unique: true, index: true }, // Indexed for search
  offer: {
    type: { type: String, enum: ['registration', 'course'], required: true },
    discount: { type: Number, required: true },
  },
  usedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('Invitation', invitationSchema);