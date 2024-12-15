const selectElement = document.getElementById('tema');
const confirmarButton = document.getElementById('confirmar-tema');

selectElement.addEventListener('change', () => {
    if (selectElement.value) {
        confirmarButton.disabled = false; 
    } else {
        confirmarButton.disabled = true; 
    }
});

confirmarButton.addEventListener('click', () => {
    const temaSelecionado = selectElement.value;
    if (temaSelecionado) {
        localStorage.setItem('tema', temaSelecionado);
        window.location.href = '/html/geradorDificuldade.html';
    }
});
