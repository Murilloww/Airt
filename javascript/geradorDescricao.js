const { GoogleGenerativeAI } = require("@google/generative-ai");
const tema = localStorage.getItem('tema');
const dificuldade = localStorage.getItem('dificuldade');
const objecao = localStorage.getItem('objecao');

const prompt = `Gere uma ideia de desenho com o tema: ${tema}, com um nível de dificuldade: ${dificuldade}, com estas objeções: ${objecao}`;

async function gerarDescricao() {
    const tema = localStorage.getItem('tema');
    const dificuldade = localStorage.getItem('dificuldade');
    const objecao = localStorage.getItem('objecao');

    if (!tema || !dificuldade || !objecao) {
        console.error('Faltam informações');
        return;
    }

    try {
        const response = await fetch('http://localhost:5500/api/generate-description', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tema, dificuldade, objecao })
        });

        if (!response.ok) {
            throw new Error('Erro ao chamar o servidor');
        }

        const data = await response.json();
        document.querySelector('textarea').value = data.descricao;
    } catch (error) {
        console.error('Erro:', error);
        document.querySelector('textarea').value = 'Erro ao gerar descrição. Tente novamente.';
    }
}

document.addEventListener('DOMContentLoaded', gerarDescricao);
