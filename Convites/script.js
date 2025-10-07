document.addEventListener('DOMContentLoaded', () => {
    const cartao = document.querySelector('.cartao');
    const selo = document.querySelector('.selo');

    if (!cartao || !selo) {
        // If elements are missing, nothing to do.
        return;
    }

    // When selo is clicked, open the cartao (add class 'aberto') and fade the selo.
    const onSeloClick = (event) => {
        event.stopPropagation();

        // Add aberto to trigger the CSS animation on the card sides.
        cartao.classList.add('aberto');

        // Fade the selo using CSS class.
        selo.classList.add('faded');

        // Remove the click listener so this only happens once.
        selo.removeEventListener('click', onSeloClick);

        // After the fade transition ends, hide the element (optional).
        const onFadeEnd = (e) => {
            if (e.propertyName === 'opacity') {
                selo.style.display = 'none';
                selo.removeEventListener('transitionend', onFadeEnd);
            }
        };

        selo.addEventListener('transitionend', onFadeEnd);
    };

    selo.addEventListener('click', onSeloClick);
});

function getGuestNameFromUrl() {
    // Captura o caminho (path) da URL após o domínio (ex: /Maria-e-Joao)
    const path = window.location.pathname; 
    
    // Remove a barra inicial e a formata
    let guestName = path.substring(1).replace(/-/g, ' '); 

    // Define um nome padrão se a URL for a raiz
    if (guestName === "" || guestName === "/") {
        return "Nossos Queridos Convidados";
    }

    // Formata o nome para que cada palavra comece com maiúscula (ex: maria e joao -> Maria E Joao)
    guestName = guestName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return guestName;
}

// ⚠️ Esta função garante que o script só roda DEPOIS que o elemento H2 é carregado.
document.addEventListener('DOMContentLoaded', () => {
    
    const nomeConvidado = getGuestNameFromUrl();

    // Busca o elemento H2 pelo ID
    const elementoNome = document.getElementById('guest-name');

    // Injeta o nome do convidado no HTML
    if (elementoNome) {
        elementoNome.textContent = nomeConvidado;
    }
});