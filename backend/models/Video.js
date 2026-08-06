const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  filename: { type: String, required: true },
  filepath: { type: String, required: true },
  sizeBytes: { type: Number, required: true },
  durationSeconds: { type: Number, default: 0 },
  status: { type: String, enum: ['processing', 'completed', 'failed'], default: 'completed' },
  thumbnailUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Video || mongoose.model('Video', VideoSchema);
