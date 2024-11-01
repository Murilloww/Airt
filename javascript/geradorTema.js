document.querySelector('#confirmar-tema').addEventListener('click', () => {
    const temaSelecionado = document.getElementById('tema').value;
    localStorage.setItem('tema', temaSelecionado);
    window.location.href = '/html/geradorDificuldade.html';
  });
  