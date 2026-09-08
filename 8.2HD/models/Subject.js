const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // How many hours a week the student wants to give this subject.
  weeklyHours: {
    type: Number,
    required: true,
    min: 1,
    max: 40,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
    default: 'moderate',
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// A student cannot enrol in the same subject code twice, but two students can
// both have SIT725.
subjectSchema.index({ ownerId: 1, code: 1 }, { unique: true });

module.exports = mongoose.model('Subject', subjectSchema);