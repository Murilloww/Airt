const selectElement = document.getElementById('dificuldade');
const confirmarButton = document.getElementById('confirmar-dificuldade');

selectElement.addEventListener('change', () => {
    if (selectElement.value) {
        confirmarButton.disabled = false; 
    } else {
        confirmarButton.disabled = true;
    }
});

confirmarButton.addEventListener('click', () => {
    const complexidadeSelecionada = selectElement.value;
    if (complexidadeSelecionada) {
        localStorage.setItem('dificuldade', complexidadeSelecionada);
        window.location.href = '/html/geradorObjecao.html';
    }
});
