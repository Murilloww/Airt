require('dotenv').config();
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("API Key não configurada. Verifique o arquivo .env");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 300,
    responseMimeType: "text/plain",
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Método ${req.method} não permitido.` });
    }

    const { tema, dificuldade, objecao } = req.body;

    if (!tema || !dificuldade || !objecao) {
        return res.status(400).json({ error: "Faltam parâmetros obrigatórios: tema, dificuldade, objecao." });
    }

    const prompt = `
        Gere uma ideia de desenho com os seguintes critérios:
        1. Tema: ${tema}
        2. Dificuldade: ${dificuldade}
        3. Não incluir: ${objecao}

        Por favor, organize as informações em um formato claro, sem usar asteriscos ou caracteres especiais desnecessários. Evite conclusões ou comentários adicionais.`;

    console.log("Prompt enviado para a API:", prompt);
    console.log("Configuração de geração:", generationConfig);

    try {
        const result = await model.generateContent(prompt, generationConfig);
        console.log("Resposta da API:", JSON.stringify(result, null, 2));

        const descricao = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!descricao) {
            throw new Error("Resposta inválida da API.");
        }

        return res.status(200).json({ descricao });
    } catch (error) {
        
        console.error("Erro ao gerar conteúdo:", error.message);
        return res.status(500).json({ error: "Erro ao gerar a descrição. Tente novamente mais tarde." });
    }
}
