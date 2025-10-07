// Toggle the "aberto" class on the .cartao when the .selo image is clicked.
// This file is loaded in the <body>, so wait for DOMContentLoaded to ensure
// elements exist before querying them.
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