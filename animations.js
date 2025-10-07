document.addEventListener("DOMContentLoaded", function() {
    // Seleciona todos os elementos que devem ter a animação
    const elementsToFadeIn = document.querySelectorAll('.fade-in-element');

    // Configurações do Observer
    const observerOptions = {
        root: null, // Observa em relação à viewport do navegador
        rootMargin: '0px',
        threshold: 0.1 // Ativa quando 10% do elemento estiver visível
    };

    // A função que será chamada quando um elemento entrar na tela
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Se o elemento está visível (intersecting)
            if (entry.isIntersecting) {
                // Adiciona a classe que o torna visível
                entry.target.classList.add('is-visible');
                // Para de observar este elemento para a animação não repetir
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria o observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Pede ao observer para observar cada um dos nossos elementos
    elementsToFadeIn.forEach(element => {
        observer.observe(element);
    });
});