const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  phone: { type: String, default: '' },
  country: { type: String, default: 'International' },
  city: { type: String, default: 'Unknown' },
  avatar: { type: String, default: '' },
  learningGoal: { type: String, default: 'General Fluency' },
  dailyGoalMinutes: { type: Number, default: 20 },
  dailyProgressMinutes: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastLogin: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'suspended', 'banned'], default: 'active' },
  enrolledCourses: [{ type: String }],
  completedLessons: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
