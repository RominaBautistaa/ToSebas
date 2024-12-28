// script.js
document.addEventListener("DOMContentLoaded", () => {
    const hearts = document.createElement("div");
    hearts.style.position = "fixed";
    hearts.style.top = "0";
    hearts.style.width = "100%";
    hearts.style.height = "100%";
    hearts.style.pointerEvents = "none";
    document.body.appendChild(hearts);

    setInterval(() => {
        const heart = document.createElement("div");
        heart.textContent = "💖";
        heart.style.position = "absolute";
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animation = "fall 5s linear";
        heart.style.fontSize = "24px";
        hearts.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 300);

    const style = document.createElement("style");
    style.textContent = `
        @keyframes fall {
            from { transform: translateY(-50px); }
            to { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
});

const items = document.querySelectorAll('.carousel-item');
let currentIndex = 0;

document.querySelector('.prev').addEventListener('click', () => {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    items[currentIndex].classList.add('active');
});

document.querySelector('.next').addEventListener('click', () => {
    items[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].classList.add('active');
});


const messages = [
    "Me encanta todo de ti.",
    "Estoy agradecida por cada momento contigo.",
    "Tu inteligencia y bondad me motivan a ser mejor.",
    "Te amo no solo por cómo te ves, sino por quién eres."
];

let currentMessageIndex = 0;
let typingSpeed = 80; // Velocidad de escritura (en ms)
let deleteSpeed = 50; // Velocidad al borrar
let delayBetweenMessages = 3000; // Pausa más larga para leer mensajes
const typingTextElement = document.getElementById("typing-text");

function typeMessage(message, callback) {
    let i = 0;
    const interval = setInterval(() => {
        typingTextElement.textContent += message[i];
        i++;
        if (i >= message.length) {
            clearInterval(interval);
            setTimeout(() => callback(), delayBetweenMessages); // Pausa al final
        }
    }, typingSpeed);
}

function deleteMessage(callback) {
    const interval = setInterval(() => {
        typingTextElement.textContent = typingTextElement.textContent.slice(0, -1);
        if (typingTextElement.textContent.length === 0) {
            clearInterval(interval);
            callback();
        }
    }, deleteSpeed);
}

function cycleMessages() {
    typeMessage(messages[currentMessageIndex], () => {
        deleteMessage(() => {
            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
            cycleMessages();
        });
    });
}

cycleMessages();


// Cuando la página se carga, muestra el pop-up
window.onload = function() {
    document.getElementById("popup").style.display = "flex"; // Muestra el pop-up

    // Cerrar el pop-up cuando se haga clic en la "X"
    document.getElementById("close-popup").onclick = function() {
        document.getElementById("popup").style.display = "none"; // Oculta el pop-up
    };

    // También puedes cerrar el pop-up haciendo clic fuera del contenido
    document.getElementById("popup").onclick = function(event) {
        if (event.target === document.getElementById("popup")) {
            document.getElementById("popup").style.display = "none"; // Oculta el pop-up
        }
    };
};


// Calculamos los días, horas y minutos desde el 25 de abril
const startDate = new Date('2024-04-25');
const now = new Date();

const timeDifference = now - startDate; // Diferencia en milisegundos

const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

// Mostramos los valores calculados en el HTML
document.getElementById("contador-dias").innerText = days;
document.getElementById("contador-horas").innerText = hours;
document.getElementById("contador-minutos").innerText = minutes;


