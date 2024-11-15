

export default async function handler(req, res) {
    // Verifica se a requisição é do tipo POST
    if (req.method === 'POST') {
        const { tema, dificuldade, objecao } = req.body;

        // Verifica se todos os parâmetros necessários foram enviados
        if (!tema || !dificuldade || !objecao) {
            return res.status(400).json({ error: 'Parâmetros faltando.' });
        }

        // Cria o prompt para a API baseado nas informações
        const prompt = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

        try {
            // Chama a API Gemini para gerar a descrição com o prompt
            const response = await axios.post('https://api.gemini.com/v1/generate', {
                prompt: prompt,  // Passa o prompt gerado para a API
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.API_KEY}`, // Usando a chave de API da variável de ambiente
                },
            });

            // Verifica se a descrição foi retornada na resposta da API
            const descricao = response.data.descricao;

            if (descricao) {
                // Retorna a descrição gerada pela API
                res.status(200).json({ descricao });
            } else {
                // Caso a descrição não seja gerada
                res.status(500).json({ error: 'Descrição não gerada pela API.' });
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error.message);
            res.status(500).json({ error: 'Erro ao gerar descrição.' });
        }
    } else {
        // Se a requisição não for POST, retorna erro de método não permitido
        res.status(405).json({ error: 'Método não permitido.' });
    }
}
