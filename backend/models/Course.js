const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true, default: 'General' },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'], default: 'All Levels' },
  duration: { type: String, default: '10 Hours' },
  lessonsCount: { type: Number, default: 0 },
  studentsCount: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  reviewsCount: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'published', 'archived', 'hidden'], default: 'published' },
  isFree: { type: Boolean, default: true },
  badge: { type: String, default: 'Popular' },
  coverImage: { type: String, default: '' },
  instructor: {
    name: { type: String, default: 'Sarah Jenkins' },
    title: { type: String, default: 'Senior ESL Coach' },
    avatar: { type: String, default: '' }
  },
  description: { type: String, default: '' },
  learningPoints: [{ type: String }],
  tags: [{ type: String }],
  seoTitle: { type: String, default: '' },
  seoDescription: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Course || mongoose.model('Course', CourseSchema);
