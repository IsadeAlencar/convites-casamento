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
    const path = window.location.pathname; 
    let guestName = path.substring(1); 
    if (guestName === "") {
        return "Nossos Queridos Convidados";
    }

    guestName = guestName.replace(/-/g, ' '); 
    guestName = guestName.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return guestName;
}

const nomeConvidado = getGuestNameFromUrl();

const elementoNome = document.getElementById('guest-name');

if (elementoNome) {
    elementoNome.textContent = nomeConvidado;
}