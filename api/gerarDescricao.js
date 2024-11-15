require('dotenv').config();  // Carregar variáveis de ambiente antes de usar a chave API
import axios from 'axios';

const API_KEY = process.env.API_KEY;

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { tema, dificuldade, objecao } = req.body;

        // Verifica se todos os parâmetros foram fornecidos
        if (!tema || !dificuldade || !objecao) {
            return res.status(400).json({ error: 'Parâmetros faltando.' });
        }

        // Cria o prompt com os parâmetros recebidos
        const promptText = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

        try {
            // Estrutura da requisição à API Generative Language
            const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/cachedContents', {
                contents: [
                    {
                        role: "user",
                        parts: [
                            { text: promptText }
                        ]
                    }
                ],
                model: "models/gemini-1.5-flash-001"
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,  // Passando a chave da API
                },
            });

            // Verifica se a resposta contém a descrição esperada
            const descricao = response.data.contents?.[0]?.text;

            if (descricao) {
                res.status(200).json({ descricao });
            } else {
                res.status(500).json({ error: 'Descrição não gerada pela API.' });
            }
        } catch (error) {
            // Exibe o erro no console para depuração
            console.error('Erro ao chamar a API:', error.response?.data || error.message);

            // Retorna uma resposta de erro detalhada
            res.status(500).json({
                error: 'Erro ao gerar descrição.',
                details: error.response?.data || error.message,
            });
        }
    } else {
        // Caso o método não seja POST
        res.status(405).json({ error: 'Método não permitido.' });
    }
}
