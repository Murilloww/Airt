document.querySelector('#confirmar-dificuldade').addEventListener('click', () => {
    const complexidadeSelecionada = document.getElementById('dificuldade').value;
    localStorage.setItem('dificuldade', complexidadeSelecionada);
    window.location.href = '/html/geradorObjecao.html';
  });
  