// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBtP8k4Mjv9JPZhuCufj4eVVtbHEv1eVlw",
    authDomain: "play-juntoss.firebaseapp.com",
    projectId: "play-juntoss",
    storageBucket: "play-juntoss.firebasestorage.app",
    messagingSenderId: "256572254742",
    appId: "1:256572254742:web:bf039cc8aa9ef71bff6337"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Link do Google Drive (substitua pelo seu link de vídeo compartilhado)
const videoLink = "https://drive.google.com/file/d/FILE_ID/preview";
document.getElementById("gdriveIframe").src = videoLink;

// Função para enviar a mensagem
document.getElementById("sendMessageButton").addEventListener("click", function () {
    const message = document.getElementById("chatInput").value;
    if (message.trim() !== "") {
        db.collection("messages").add({
            message: message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById("chatInput").value = ""; // Limpar campo de entrada
    }
});

// Exibir mensagens em tempo real
db.collection("messages").orderBy("timestamp").onSnapshot(function (snapshot) {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = ""; // Limpar mensagens antigas
    snapshot.forEach(function (doc) {
        const message = doc.data().message;
        const div = document.createElement("div");
        div.textContent = message;
        chatMessages.appendChild(div);
    });
});