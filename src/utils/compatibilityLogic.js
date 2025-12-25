export const checkGenotypeCompatibility = (genotype1, genotype2) => {
  const combinations = {
    'AA+AA': {
      compatible: true,
      risk: 'None',
      message: 'Excellent genetic match! No risk of sickle cell disease.',
      recommendation: 'Proceed with confidence.'
    },
    'AA+AS': {
      compatible: true,
      risk: 'Carrier Risk',
      message: 'Compatible. Children may be carriers but won\'t have sickle cell disease.',
      recommendation: 'Normal marriage recommended.'
    },
    'AA+SS': {
      compatible: true,
      risk: 'Carrier Risk',
      message: 'All children will be carriers (AS) but healthy.',
      recommendation: 'Medically safe for reproduction.'
    },
    'AS+AS': {
      compatible: false,
      risk: 'High',
      message: '25% chance of sickle cell disease in children.',
      recommendation: 'Genetic counseling strongly recommended.'
    },
    'AS+SS': {
      compatible: false,
      risk: 'Very High',
      message: '50% chance of sickle cell disease in children.',
      recommendation: 'Seek medical advice before planning children.'
    },
    'SS+SS': {
      compatible: false,
      risk: 'Extreme',
      message: 'All children will have sickle cell disease.',
      recommendation: 'Consider alternative family planning options.'
    }
  };

  // Sort genotypes alphabetically for consistent key
  const key = [genotype1, genotype2].sort().join('+');
  
  return combinations[key] || {
    compatible: false,
    risk: 'Unknown',
    message: 'Please consult a genetic counselor.',
    recommendation: 'Medical advice required.'
  };
};

export const checkBloodCompatibility = (blood1, blood2) => {
  if (!blood1 || !blood2) {
    return {
      compatible: true,
      message: 'Blood group compatibility not assessed.'
    };
  }

  // Check Rh factor compatibility
  const getRhFactor = (bloodGroup) => bloodGroup.includes('-') ? 'negative' : 'positive';
  
  const rh1 = getRhFactor(blood1);
  const rh2 = getRhFactor(blood2);

  if (rh1 === 'negative' && rh2 === 'positive') {
    return {
      compatible: true,
      warning: true,
      message: 'Rh incompatibility possible. Mother may need Rh immunoglobulin during pregnancy.'
    };
  }

  return {
    compatible: true,
    message: 'Blood groups are compatible for reproduction.'
  };
};

export const calculateChildProbabilities = (genotype1, genotype2) => {
  // Simple Punnett square simulation
  if (genotype1 === 'AA' && genotype2 === 'AA') {
    return { AA: '100%', AS: '0%', SS: '0%' };
  }
  if ((genotype1 === 'AA' && genotype2 === 'AS') || (genotype1 === 'AS' && genotype2 === 'AA')) {
    return { AA: '50%', AS: '50%', SS: '0%' };
  }
  if (genotype1 === 'AS' && genotype2 === 'AS') {
    return { AA: '25%', AS: '50%', SS: '25%' };
  }
  if ((genotype1 === 'AA' && genotype2 === 'SS') || (genotype1 === 'SS' && genotype2 === 'AA')) {
    return { AA: '0%', AS: '100%', SS: '0%' };
  }
  if ((genotype1 === 'AS' && genotype2 === 'SS') || (genotype1 === 'SS' && genotype2 === 'AS')) {
    return { AA: '0%', AS: '50%', SS: '50%' };
  }
  
  return { AA: 'Unknown', AS: 'Unknown', SS: 'Unknown' };
};