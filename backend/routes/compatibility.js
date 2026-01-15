const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const CompatibilityCheck = require('../models/CompatibilityCheck');
const HealthProfile = require('../models/HealthProfile');

// Check compatibility (for logged-in users)
router.post('/check', auth, async (req, res) => {
  try {
    const { partnerGenotype, partnerBloodGroup, partnerName } = req.body;

    const userProfile = await HealthProfile.findOne({ userId: req.user._id });
    if (!userProfile) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please complete your health profile first' 
      });
    }

    const result = calculateCompatibility(userProfile.genotype, partnerGenotype);

    const compatibilityCheck = new CompatibilityCheck({
      userId: req.user._id,
      userProfileId: userProfile._id,
      partnerName: partnerName || '',
      partnerGenotype,
      partnerBloodGroup: partnerBloodGroup || '',
      result
    });
    await compatibilityCheck.save();

    res.json({
      success: true,
      result,
      checkId: compatibilityCheck._id,
      checkedAt: compatibilityCheck.checkedAt
    });
  } catch (error) {
    console.error('Compatibility check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error checking compatibility' 
    });
  }
});

// Quick check (no authentication required)
router.post('/quick-check', async (req, res) => {
  try {
    const { userGenotype, partnerGenotype } = req.body;

    if (!userGenotype || !partnerGenotype) {
      return res.status(400).json({ 
        success: false, 
        message: 'Both genotypes are required' 
      });
    }

    const result = calculateCompatibility(userGenotype, partnerGenotype);

    res.json({
      success: true,
      result,
      message: 'Note: Create an account to save results and access full features'
    });
  } catch (error) {
    console.error('Quick check error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
});

// Genetic compatibility calculation
function calculateCompatibility(genotype1, genotype2) {
  const genotypes = [genotype1, genotype2].sort();
  const combination = genotypes.join('+');

  const compatibilityMatrix = {
    'AA+AA': {
      compatible: true,
      riskLevel: 'None',
      riskScore: 0,
      message: 'Excellent genetic match! No risk of sickle cell disease in children.',
      recommendation: 'Proceed with confidence.',
      childProbabilities: { AA: '100%', AS: '0%', SS: '0%' }
    },
    'AA+AS': {
      compatible: true,
      riskLevel: 'Low',
      riskScore: 1,
      message: 'Compatible. Children have 50% chance of being carriers (AS), but no sickle cell disease.',
      recommendation: 'Normal marriage recommended.',
      childProbabilities: { AA: '50%', AS: '50%', SS: '0%' }
    },
    'AA+SS': {
      compatible: true,
      riskLevel: 'Low',
      riskScore: 1,
      message: 'All children will be carriers (AS) but will not have sickle cell disease.',
      recommendation: 'Medically safe for reproduction.',
      childProbabilities: { AA: '0%', AS: '100%', SS: '0%' }
    },
    'AS+AS': {
      compatible: false,
      riskLevel: 'High',
      riskScore: 3,
      message: '25% chance of sickle cell disease (SS), 50% chance carriers (AS), 25% chance normal (AA).',
      recommendation: 'Genetic counseling strongly recommended.',
      childProbabilities: { AA: '25%', AS: '50%', SS: '25%' }
    },
    'AS+SS': {
      compatible: false,
      riskLevel: 'Very High',
      riskScore: 4,
      message: '50% chance of sickle cell disease (SS), 50% chance carriers (AS).',
      recommendation: 'High risk. Seek medical advice before planning children.',
      childProbabilities: { AA: '0%', AS: '50%', SS: '50%' }
    },
    'SS+SS': {
      compatible: false,
      riskLevel: 'Extreme',
      riskScore: 5,
      message: 'All children will have sickle cell disease (SS).',
      recommendation: 'Consider alternative family planning options.',
      childProbabilities: { AA: '0%', AS: '0%', SS: '100%' }
    }
  };

  return compatibilityMatrix[combination] || {
    compatible: false,
    riskLevel: 'Unknown',
    riskScore: 2,
    message: 'Please consult a genetic counselor for this combination.',
    recommendation: 'Medical advice required.',
    childProbabilities: { AA: 'Unknown', AS: 'Unknown', SS: 'Unknown' }
  };
}

module.exports = router;