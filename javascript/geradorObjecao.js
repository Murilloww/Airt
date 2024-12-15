document.addEventListener('DOMContentLoaded', () => {
    const confirmarBtn = document.querySelector('#confirmar-objecao');
  
    if (confirmarBtn) {
        confirmarBtn.addEventListener('click', () => {
            const objecaoTexto = document.querySelector('input[type="text"]').value.trim();   
            const objecaoFinal = objecaoTexto || "nenhuma objeção";
            localStorage.setItem('objecao', objecaoFinal);     
            window.location.href = '/html/geradorDescricao.html';
        });
    } else {
        console.error("Elemento com id 'confirmar-objecao' não encontrado.");
    }
  });
  