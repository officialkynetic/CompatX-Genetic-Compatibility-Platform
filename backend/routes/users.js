const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const HealthProfile = require('../models/HealthProfile');

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await HealthProfile.findOne({ userId: req.user._id });
    
    if (!profile) {
      return res.json({
        success: true,
        profile: null,
        message: 'No profile found'
      });
    }

    res.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Save/update health profile
router.post('/profile', auth, async (req, res) => {
  try {
    const { genotype, bloodGroup, age, gender, allergies, medications } = req.body;

    const validGenotypes = ['AA', 'AS', 'SS', 'AC', 'SC', 'CC'];
    if (!validGenotypes.includes(genotype)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid genotype' 
      });
    }

    let profile = await HealthProfile.findOne({ userId: req.user._id });

    if (profile) {
      profile.genotype = genotype;
      profile.bloodGroup = bloodGroup || '';
      profile.age = age || null;
      profile.gender = gender || '';
      profile.allergies = allergies || '';
      profile.medications = medications || '';
      await profile.save();
    } else {
      profile = new HealthProfile({
        userId: req.user._id,
        genotype,
        bloodGroup: bloodGroup || '',
        age: age || null,
        gender: gender || '',
        allergies: allergies || '',
        medications: medications || ''
      });
      await profile.save();
    }

    res.json({
      success: true,
      message: 'Profile saved successfully',
      profile
    });
  } catch (error) {
    console.error('Save profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error saving profile' 
    });
  }
});

module.exports = router;