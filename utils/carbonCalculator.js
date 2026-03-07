/**
 * Calculates the carbon footprint for a product.
 * @param {object} product - The product object (must have category, weight, materials).
 * @returns {object} - An object containing the emission value and sustainability level.
 */
const calculateCarbonFootprint = (product) => {
  const { category, weight, materials } = product;
  let emission = 0;

  // --- RULE 1: Base emission from category and weight ---
  const emissionFactors = {
    'electronics': 50, // kg CO2 per kg of product
    'clothing': 15,
    'furniture': 25,
    'books': 5,
    'food': 3,
  };
  const categoryFactor = emissionFactors[category] || 20; // Default factor if category not found
  emission += categoryFactor * weight;

  // --- RULE 2: Add extra emission for certain materials ---
  if (materials && Array.isArray(materials)) {
    if (materials.includes('plastic')) {
      emission += 10;
    }
    if (materials.includes('aluminum')) {
      emission += 15;
    }
  }

  // --- RULE 3: Categorize sustainability level ---
  let sustainabilityLevel;
  if (emission < 100) {
    sustainabilityLevel = 'Low';
  } else if (emission < 300) {
    sustainabilityLevel = 'Medium';
  } else {
    sustainabilityLevel = 'High';
  }

  return {
    emission: Math.round(emission),
    level: sustainabilityLevel,
  };
};

module.exports = { calculateCarbonFootprint };