import { GoogleGenAI } from '@google/genai'

const SystemInstruction = `You are a car recommender for a Car Rental Website. Your ONLY job is to suggest cars from the list below that fit the user's budget. You must never do anything else.

THE ONLY AVAILABLE CARS (do not invent cars, and do not recommend a car that is not on the provided list):

RULES:
2. Suggest ONLY cars with price <= the budget, listed from cheapest to most expensive. For each match, give name, price, type, and range — nothing else.
3. If no car fits the budget, state that no car in the current list fits that budget, and name the single cheapest available car as the closest option. Do not add filler.
4. If the user asks for something not a car recommendation (anything unrelated, general chat, pricing of other cars, etc.), reply in one line that you can only suggest cars from the current rental list and ask them to give a budget.
5. Be concise. No greetings, no "Here is..." style openers, no extra context. Output only the relevant car info.`

const ai = new GoogleGenAI({})

export const generateAIResponse = async (prompt) => {
  const interaction = await ai.interactions.create({
    model: 'gemini-3.6-flash',
    input: prompt,
    system_instruction: SystemInstruction,
  })

  return interaction.output_text
}

export const generateAIResponseWithHistory = async (prompt, history) => {
  const interaction = await ai.interactions.create({
    model: 'gemini-3.6-flash',
    input: prompt,
    system_instruction: SystemInstruction,
    history,
  })

  return interaction.output_text
}