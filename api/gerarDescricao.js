require('dotenv').config();
import { GoogleGenerativeAI} from "@google/generative-ai";

const tema = localStorage.getItem('tema');
const dificuldade = localStorage.getItem('dificuldade');
const objecao = localStorage.getItem('objecao');

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


const prompt = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;
const result = await model.generateContent(prompt);
console.log(result.response.text());

