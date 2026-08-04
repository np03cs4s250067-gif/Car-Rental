import { generateGroqAIResponse } from "../services/groqAPI.js";
import Vehicle from "../data/car.js";

export const getCarRecommendation = async (req, res) => {
    try {
        const { passengers, budget, purpose } = req.body;
        
        // Fetch active available vehicles for AI prompt
        const activeFleet = await Vehicle.find({ available: true }, 'model type rate plateNumber');

        const userCriteria = { passengers, budget, purpose };
        const aiOutput = await generateGroqAIResponse(userCriteria, activeFleet);
    
        return res.status(200).json({ data: aiOutput });
    } catch (err) {
        console.error("AI Assistant Error:", err);
        if (err.status === 429) {
            return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
        } else if (err.status === 500) {
            return res.status(500).json({ error: "Internal server error from AI service." });
        } else if (err.status === 400) {
            return res.status(400).json({ error: "Bad request. Please check your input.", details: err.message });
        } else {
            return res.status(500).json({ error: "An unexpected error occurred.", details: err.message });
        }
    }
}