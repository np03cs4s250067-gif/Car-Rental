import OpenAI from "openai";

const groqClient = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
});

export const generateGroqAIResponse = async (userCriteria, availableFleet) => {
    const systemRules = `You are a vehicle concierge for a Car Rental Platform. Your task is to recommend cars from the provided list that match the user's trip preferences.
Return response in strict JSON format:
{
  "recommendations": [
    {
      "model": "Car Model Name",
      "rate": 5000,
      "reason": "Why this car fits the user's criteria."
    }
  ]
}

CRITERIA:
1. Suggest top 2-3 matching vehicles.
2. Vehicles MUST strictly exist in the provided available fleet list.
3. Output ONLY JSON with no extra commentary.`;

    const userPrompt = `TRIP REQUEST:
- Passengers: ${userCriteria.passengers}
- Budget (NPR): ${userCriteria.budget}
- Purpose: ${userCriteria.purpose}

AVAILABLE FLEET:
${JSON.stringify(availableFleet, null, 2)}

Recommend the top 2-3 matching vehicles in valid JSON format.`;

    const completion = await groqClient.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            { role: "system", content: systemRules },
            { role: "user", content: userPrompt }
        ],
        response_format: { type: "json_object" }
    });
    
    return JSON.parse(completion.choices[0].message.content);
}