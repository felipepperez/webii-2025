const socket = new WebSocket(`ws://${window.location.host}`);

socket.onmessage = async (event) => {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = await event.data.text();
    messagesDiv.appendChild(messageElement);

    const input = document.getElementById('messageInput');
    window.scrollTo({ top: input.offsetTop - 20, behavior: 'smooth' });
}

function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;

    if (!message) return;

    socket.send(message);
    input.value = '';
}