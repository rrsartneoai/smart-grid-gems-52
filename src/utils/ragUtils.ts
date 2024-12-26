import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY || "");

export async function generateRAGResponse(input: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      You are an AI assistant specializing in power grid management and energy systems.
      Please provide a response to the following query: ${input}
      
      Respond in a professional but friendly manner, focusing on power grid related information.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating response:', error);
    return "Przepraszam, wystąpił błąd podczas generowania odpowiedzi. Proszę spróbować ponownie.";
  }
}

export async function processDocumentForRAG(text: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze the following text related to power grid management and energy systems:
      ${text}
      
      Please identify and list the 5 most important topics or key points from this document.
      Format your response as a simple list of 5 topics, one per line.
      Focus on energy-related aspects such as:
      - Power consumption patterns
      - Energy efficiency measures
      - Cost optimization
      - Environmental impact
      - Technical specifications
      
      Return ONLY the 5 topics, nothing else.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error processing document:', error);
    return `1. Zużycie energii
2. Efektywność energetyczna
3. Koszty operacyjne
4. Emisja CO2
5. Rekomendacje techniczne`;
  }
}