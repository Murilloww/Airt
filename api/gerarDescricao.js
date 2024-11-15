require('dotenv').config();
import { 
    GoogleGenerativeAI, 
    HarmCategory, 
    HarmBlockThreshold 
} from "@google/generative-ai";

// Configuração da API
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("API Key não configurada. Verifique o arquivo .env");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

// Função para interagir com o modelo
async function generatePromptResponse(tema, dificuldade, objecao) {
    const promptText = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    try {
        const result = await chatSession.sendMessage(promptText);
        return result.response.text;
    } catch (error) {
        console.error("Erro ao interagir com a API:", error.message);
        throw new Error("Erro ao gerar a resposta.");
    }
}

// Exportando a função para o Vercel
