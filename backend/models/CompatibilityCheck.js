const axios = require('axios');

const checkCompatibility = async (userData) => {
    try {
        // 1. Prepare the data exactly how the CSV was structured
        const features = [
            userData.age,
            userData.gender,
            userData.familyHistory,
            userData.hemoglobin,
            userData.fetalHemoglobin,
            userData.rdw_cv,
            userData.serumFerritin,
            userData.brca1,
            userData.p53,
            userData.sweatChloride,
            userData.sickledRbc,
            userData.il6
        ];

        // 2. Call the Python ML Brain
        const response = await axios.post('http://localhost:5000/predict', {
            features: features
        });

        // 3. Get the prediction (0-4)
        const category = response.data.disease_category;

        // 4. Return a human-friendly message based on the ML result
        const messages = {
            0: "Low Risk: No significant genetic markers detected.",
            1: "Moderate Risk: Some markers present, consultation advised.",
            2: "High Risk: Significant markers for Sickle Cell detected.",
            3: "Critical: Immediate medical consultation required.",
            4: "Carrier: You carry the trait but may not show symptoms."
        };

        return messages[category];

    } catch (error) {
        console.error("ML Error:", error);
        return "Error connecting to the ML engine.";
    }
};