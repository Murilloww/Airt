import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { tema, dificuldade, objecao } = req.body;

        if (!tema || !dificuldade || !objecao) {
            return res.status(400).json({ error: 'Parâmetros faltando.' });
        }

        const prompt = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

        try {
            const response = await axios.post('https://api.gemini.com/v1beta/cachedContents', {
                prompt: prompt,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.API_KEY}`,
                },
            });

            const descricao = response.data.descricao;

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
