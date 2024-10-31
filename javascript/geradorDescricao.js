document.addEventListener('DOMContentLoaded', async () => {
    const tema = localStorage.getItem('tema');
    const complexidade = localStorage.getItem('complexidade');
    const objecoes = localStorage.getItem('objecoes');

    const response = await fetch('http://localhost:3000/api/gerar-descricao', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tema, complexidade, restricoes: objecoes }),
    });
  
    const data = await response.json();
    document.querySelector('textarea').textContent = data.descricao;
  });
  