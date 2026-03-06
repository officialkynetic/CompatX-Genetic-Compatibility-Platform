const mongoose = require('mongoose');

const healthProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  genotype: {
    type: String,
    enum: ['AA', 'AS', 'SS', 'AC', 'SC', 'CC', ''],
    required: [true, 'Genotype is required']
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-', ''],
    default: ''
  },
  age: {
    type: Number,
    min: [18, 'Age must be at least 18'],
    max: [100, 'Age must be less than 100']
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say', '']
  },
  allergies: {
    type: String,
    maxlength: [500, 'Allergies cannot exceed 500 characters']
  },
  medications: {
    type: String,
    maxlength: [500, 'Medications cannot exceed 500 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

healthProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('HealthProfile', healthProfileSchema);