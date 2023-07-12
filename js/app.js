/* Variables */
const formulario = document.querySelector('#formulario');
const contenido = document.querySelector('#contenido');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

/* Event Listenner */
eventListeners();
function eventListeners() {
    /* Cuando el usuario agrega un nuevo tweet */
    formulario.addEventListener('submit', agregarTweet);

    /* Cuando el docuemtno esta listo */
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets') || []); /* esto es un placeholder */
        crearHTML();
    });
}

/* Funciones */
function agregarTweet(e) {
    e.preventDefault();
    /* textarea donde le usuario escribe */
    const tweet = document.querySelector('#tweet').value;
    
    if(tweet === '') {
        if(!document.querySelector('#formulario p')) {
            mostrarError('Un mensaje no puede ir vacio');
        }
        return;
    }
    if(tweet.length > 120) {
        mostrarError('Superaste el limite de 120 carácteres');
        return;
    }

    /* Añadir al arreglo de tweets */
    const tweetObj = {
        id: Date.now(),
        tweet /* tweet: tweet -> como llave y valor es lo mismo lo podemos dejar asi */
    }

    tweets = [...tweets, tweetObj];

    crearHTML();
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('error');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

/* Muesta un listado de los tweets, colocamos el condicional por si el usuario borra todo */
function crearHTML() {
    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach(tweet => {
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerHTML = 'X';
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            listaTweets.appendChild(btnEliminar);

            const li = document.createElement('li');
            li.innerHTML = tweet.tweet;
            listaTweets.appendChild(li);
        });
    }

    sincronizarSotorage();
}

function sincronizarSotorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

/* Limpiar HTML */
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
    formulario.reset();
    document.querySelector('#tweet').focus();
    
}

/* Borrar Tweet */
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}