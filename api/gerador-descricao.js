
const axios = require('axios');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { tema, dificuldade, objecao } = req.body;

        // Verifica se todos os parâmetros foram enviados
        if (!tema || !dificuldade || !objecao) {
            return res.status(400).json({ error: 'Parâmetros faltando.' });
        }

        // Cria o prompt para a API baseado nas informações
        const prompt = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

        try {
            // Chamada à API Gemini (ou outra API de IA que você está utilizando)
            const response = await axios.post('https://api.gemini.com/v1/generate', {
                prompt: prompt,  // Passa o prompt gerado para a API
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.API_KEY}`, // Usando a chave de API da variável de ambiente
                },
            });

            // Supondo que a API retorne a descrição no campo 'descricao'
            const descricao = response.data.descricao;

            if (descricao) {
                // Retorna a descrição gerada
                res.status(200).json({ descricao });
            } else {
                // Caso a descrição não esteja presente na resposta
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
