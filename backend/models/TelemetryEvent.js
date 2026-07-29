const mongoose = require('mongoose');

const TelemetryEventSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true },
  userId: { type: String, required: true, index: true },
  videoId: { type: String, required: true, index: true },
  courseId: { type: String, required: true },
  eventType: { type: String, enum: ['play', 'pause', 'seek', 'heartbeat', 'ratechange', 'ended', 'stall'], required: true },
  timestampSeconds: { type: Number, required: true },
  durationSeconds: { type: Number, required: true },
  playbackRate: { type: Number, default: 1.0 },
  seekFromSeconds: { type: Number, default: null },
  seekToSeconds: { type: Number, default: null },
  deviceType: { type: String, enum: ['desktop', 'mobile', 'tablet'], default: 'desktop' },
  browser: { type: String, default: 'Chrome' },
  country: { type: String, default: 'US' }
}, { timestamps: true });

module.exports = mongoose.models.TelemetryEvent || mongoose.model('TelemetryEvent', TelemetryEventSchema);
