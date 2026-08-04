import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateGroqAIResponse = async (tripDetails, availableCars) => {
    const SystemInstruction = `You are a car recommender for a Car Rental Website. Your ONLY job is to suggest cars from the provided list that fit the user's trip details.
You must return the response in pure JSON format matching this structure:
{
  "recommendations": [
    {
      "model": "Car Model Name",
      "rate": 5000,
      "reason": "Why this car fits the budget, passengers, and purpose."
    }
  ]
}

RULES:
1. Suggest the best 2-3 cars.
2. The cars MUST be from the provided available cars list.
3. Do not include any text outside the JSON.`;

    const prompt = `TRIP DETAILS:
- Passengers: ${tripDetails.passengers}
- Budget: ${tripDetails.budget}
- Purpose: ${tripDetails.purpose}

AVAILABLE CARS:
${JSON.stringify(availableCars, null, 2)}

Given this trip need and our available car list, recommend the best 2-3 car options with reasons. Return JSON.`;

    const response = await client.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: SystemInstruction },
            { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
    });
    
    return JSON.parse(response.choices[0].message.content);
}