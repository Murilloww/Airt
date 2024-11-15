import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { tema, dificuldade, objecao } = req.body;

        if (!tema || !dificuldade || !objecao) {
            return res.status(400).json({ error: 'Parâmetros faltando.' });
        }

        // Cria o prompt com os parâmetros recebidos
        const promptText = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

        try {
            // Estrutura de dados esperada pela API `cachedContents.create`
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
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                },
            });

            // Extraindo a descrição da resposta, conforme o retorno da API
            const descricao = response.data.contents?.[0]?.text;

            if (descricao) {
                res.status(200).json({ descricao });
            } else {
                res.status(500).json({ error: 'Descrição não gerada pela API.' });
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error.message);
            res.status(500).json({ error: 'Erro ao gerar descrição.' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido.' });
    }
}
