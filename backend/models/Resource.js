const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: { type: String, default: 'General' },
  type: { type: String, default: 'PDF Guide' },
  pages: { type: String, default: '1 Page' },
  downloads: { type: String, default: '0' },
  description: { type: String, default: '' },
  downloadUrl: { type: String, default: '#' }
}, { timestamps: true });

module.exports = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
