const submitButton = document.getElementById('submitButton');
const link = document.getElementById('link');
const audio = document.querySelector('audio');
const video = document.querySelector('video');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');
const internetStatus = document.getElementById('internetStatus');

//Función para comprobar la conexión a internet

function checkInternetConnection() {
    const online = navigator.onLine;

    if (online) {
        internetStatus.classList.remove('offline');
        internetStatus.classList.add('online');
        internetStatus.querySelector('.icon').innerHTML = '<i class="fa fa-wifi"></i>';
        internetStatus.querySelector('.text').textContent = 'Conectado a Internet';
        enableElements();
        showToast('Conectado a Internet', 'fa fa-wifi');
    } else {
        internetStatus.classList.remove('online');
        internetStatus.classList.add('offline');
        internetStatus.querySelector('.icon').innerHTML = '<i class="fa fa-wifi fa-flip-horizontal"></i>';
        internetStatus.querySelector('.text').textContent = 'Sin conexión';
        disableElements();
        showToast('Sin conexión', 'fa fa-wifi fa-flip-horizontal');
    }
}

// Función para desactivar elementos cuando no hay conexión
function disableElements() {
    submitButton.disabled = true;
    link.classList.add('disabled');
    audio.pause();
    video.pause();
}

// Función para activar elementos cuando hay conexión
function enableElements() {
    submitButton.disabled = false;
    link.classList.remove('disabled');
    if (!audio.paused) {
        audio.play();
    }
    if (!video.paused) {
        video.play();
    }
}

// Función para mostrar toast
function showToast(message, iconClass) {
    toastMessage.textContent = message;
    toast.querySelector('.icon').innerHTML = `<i class="${iconClass}"></i>`;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Evento para detectar cambios en la conexión a internet
window.addEventListener('online', checkInternetConnection);
window.addEventListener('offline', checkInternetConnection);

// Verificar estado de conexión al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    checkInternetConnection();
});
