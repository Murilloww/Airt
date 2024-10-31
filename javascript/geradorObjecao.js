document.querySelector('.geradorTema-animation2').addEventListener('click', () => {
    const objecaoTexto = document.querySelector('input[type="text"]').value;
    localStorage.setItem('objecoes', objecaoTexto);
    window.location.href = '/html/geradorDescricao.html';
  });
  