const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  siteName: { type: String, default: 'FluentX - Premium English Platform' },
  heroTitle: { type: String, default: 'Master Conversational English With Confidence' },
  heroSubtitle: { type: String, default: 'Learn from certified coaches, practice speech evaluation, and earn verified certificates 100% free.' },
  announcementBannerText: { type: String, default: '🎉 Over 50,000+ Students Enrolled! All Courses 100% Free Forever.' },
  announcementBannerActive: { type: Boolean, default: true },
  seoMetaDescription: { type: String, default: 'FluentX - Master English speaking, grammar, and fluency.' },
  primaryColor: { type: String, default: '#6D28D9' },
  accentColor: { type: String, default: '#F97316' },
  contactEmail: { type: String, default: 'support@fluentx.org' },
  faqs: [{
    question: String,
    answer: String
  }],
  testimonials: [{
    name: String,
    role: String,
    country: String,
    photo: String,
    story: String,
    rating: Number
  }]
}, { timestamps: true });

module.exports = mongoose.models.Setting || mongoose.model('Setting', SettingSchema);
