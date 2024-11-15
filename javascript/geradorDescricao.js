async function geradorDescricao() {
    const tema = localStorage.getItem('tema');
    const dificuldade = localStorage.getItem('dificuldade');
    const objecao = localStorage.getItem('objecao');

    // Validação dos dados do localStorage
    if (!tema || !dificuldade || !objecao) {
        console.error('Faltam informações');
        document.querySelector('textarea').value = 'Informações incompletas para gerar descrição.';
        return;
    }

    document.querySelector('textarea').value = 'Gerando descrição...';

    try {
        const response = await axios.post('/api/gerarDescricao.js', { tema, dificuldade, objecao });

        // Verificar se o status da resposta é válido
        if (response.status !== 200) {
            throw new Error(`Erro na API: Status ${response.status}`);
        }

        // Obter e verificar a descrição
        const descricao = response?.data?.descricao;
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


document.addEventListener('DOMContentLoaded', geradorDescricao);
