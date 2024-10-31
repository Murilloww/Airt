document.querySelector('.geradorTema-animation2').addEventListener('click', () => {
    const complexidadeSelecionada = document.getElementById('tema').value;
    localStorage.setItem('complexidade', complexidadeSelecionada);
    window.location.href = '/html/geradorObjecao.html';
  });
  