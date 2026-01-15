const mongoose = require('mongoose');

const compatibilityCheckSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HealthProfile'
  },
  partnerName: {
    type: String,
    trim: true
  },
  partnerGenotype: {
    type: String,
    enum: ['AA', 'AS', 'SS', 'AC', 'SC', 'CC'],
    required: true
  },
  partnerBloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', '']
  },
  result: {
    compatible: Boolean,
    riskLevel: String,
    riskScore: Number,
    message: String,
    recommendation: String,
    childProbabilities: {
      AA: String,
      AS: String,
      SS: String
    }
  },
  checkedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CompatibilityCheck', compatibilityCheckSchema);