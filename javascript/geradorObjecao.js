document.querySelector('#confimar-objecao').addEventListener('click', () => {
    const objecaoTexto = document.querySelector('input[type="text"]').value;
    localStorage.setItem('objecoes', objecaoTexto);
    window.location.href = '/html/geradorDescricao.html';
  });
  