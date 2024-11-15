require('dotenv').config();  
import axios from 'axios';
const cors = require('cors');
app.use(cors());  // Permite requisições de diferentes origens

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
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
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();

  const promptText = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

/*export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { tema, dificuldade, objecao } = req.body;

        // Check if all parameters were provided
        if (!tema || !dificuldade || !objecao) {
            return res.status(400).json({ error: 'Parâmetros faltando.' });
        }

        // Create the prompt text using the provided parameters
        const promptText = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

        try {
            // Send the request to the Generative Language API
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/cachedContents', {
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: promptText }
                        ]
                    }
                ],
                model: "models/gemini-1.5-flash-001",  // Use the appropriate model for your use case
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GEMINI_API_KEY}`,  // Correct usage of the API key
                },
            });

            // Extract the description from the API response
            const descricao = response.data.contents?.[0]?.text;

            // If a description is returned, send it in the response
            if (descricao) {
                res.status(200).json({ descricao });
            } else {
                res.status(500).json({ error: 'Descrição não gerada pela API.' });
            }
        } catch (error) {
            // Log the error for debugging
            console.error('Erro ao chamar a API:', error.response?.data || error.message);

            // Return a detailed error response
            res.status(500).json({
                error: 'Erro ao gerar descrição.',
                details: error.response?.data || error.message,
            });
        }
    } else {
        // Return error if the method is not POST
        res.status(405).json({ error: 'Método não permitido.' });
    }
}*/
