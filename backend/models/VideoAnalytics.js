const mongoose = require('mongoose');

const VideoAnalyticsSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  courseId: { type: String, required: true },
  totalViews: { type: Number, default: 0 },
  uniqueViewers: { type: Number, default: 0 },
  totalWatchTimeSeconds: { type: Number, default: 0 },
  averageWatchDurationSeconds: { type: Number, default: 0 },
  completionCount: { type: Number, default: 0 },
  completionPercentageAverage: { type: Number, default: 0 },
  pauseFrequencyTotal: { type: Number, default: 0 },
  seekFrequencyTotal: { type: Number, default: 0 },
  secondRetentionMap: [{ second: Number, viewerCount: Number, rewatchCount: Number, dropoffCount: Number }],
  playbackSpeedDistribution: {
    x0_5: { type: Number, default: 0 },
    x1_0: { type: Number, default: 0 },
    x1_25: { type: Number, default: 0 },
    x1_5: { type: Number, default: 0 },
    x2_0: { type: Number, default: 0 }
  },
  deviceDistribution: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.models.VideoAnalytics || mongoose.model('VideoAnalytics', VideoAnalyticsSchema);
