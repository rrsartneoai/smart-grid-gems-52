import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY || "");

export async function generateRAGResponse(input: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      You are an AI assistant specializing in power grid management and energy systems.
      Please provide a response to the following query: ${input}
      
      Respond in a professional but friendly manner, focusing on power grid related information.
      Use Polish language in your response.
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
    console.log('Processing document with text:', text.substring(0, 100) + '...');
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Przeanalizuj poniższy tekst i wypisz 5 najważniejszych zagadnień lub tematów z tego dokumentu.
      Tekst do analizy:
      ${text}
      
      Zasady:
      1. Wypisz dokładnie 5 tematów
      2. Każdy temat powinien być krótki (2-4 słowa)
      3. Tematy powinny dotyczyć energetyki, sieci energetycznej lub zarządzania energią
      4. Odpowiedź sformatuj jako prostą listę, każdy temat w nowej linii
      5. Nie numeruj tematów
      6. Nie dodawaj żadnego tekstu przed ani po liście
      
      Przykładowy format odpowiedzi:
      Zużycie energii w sieci
      Optymalizacja przesyłu
      Monitoring urządzeń
      Analiza strat energii
      Prognozowanie obciążeń
    `;

    console.log('Sending prompt to Gemini...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const topics = response.text().trim();
    console.log('Received topics from Gemini:', topics);
    return topics;
  } catch (error) {
    console.error('Error processing document:', error);
    return `Zużycie energii w sieci
Optymalizacja przesyłu
Monitoring urządzeń
Analiza strat energii
Prognozowanie obciążeń`;
  }
}