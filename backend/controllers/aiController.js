import { generateGroqAIResponse } from "../services/groqAPI.js";
import Car from "../data/car.js";

export const getCarRecommendation = async (req, res) => {
    try {
        const { passengers, budget, purpose } = req.body;
        
        // Fetch currently available cars to pass to the AI
        const availableCars = await Car.find({ available: true }, 'model type rate plateNumber');

        const tripDetails = { passengers, budget, purpose };
        const response = await generateGroqAIResponse(tripDetails, availableCars);
    
        return res.status(200).json({ data: response });
    } catch (error) {
        console.error("AI Generation Error:", error);
        if (error.status === 429) {
            return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
        } else if (error.status === 500) {
            return res.status(500).json({ error: "Internal server error from AI service." });
        } else if (error.status === 400) {
            return res.status(400).json({ error: "Bad request. Please check your input.", details: error.message });
        } else {
            return res.status(500).json({ error: "An unexpected error occurred.", details: error.message });
        }
    }
}