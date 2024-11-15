async function gerarDescricao() {
    const tema = localStorage.getItem('tema');
    const dificuldade = localStorage.getItem('dificuldade');
    const objecao = localStorage.getItem('objecao');

    if (!tema || !dificuldade || !objecao) {
        console.error('Faltam informações');
        document.querySelector('textarea').value = 'Informações incompletas para gerar descrição.';
        return;
    }

    try {
        const response = await axios.post('/api/generate-description', { tema, dificuldade, objecao });

        if (response.status !== 200) {
            throw new Error('Erro ao chamar o servidor');
        }

        const descricao = response.data.descricao;
        if (descricao) {
            document.querySelector('textarea').value = descricao;
        } else {
            document.querySelector('textarea').value = 'Descrição não foi gerada pela API.';
        }
    } catch (error) {
        console.error('Erro:', error);
        document.querySelector('textarea').value = 'Erro ao gerar descrição. Tente novamente.';
    }
}

document.addEventListener('DOMContentLoaded', gerarDescricao);
