// Get DOM elements
const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-btn");

// Add event listener for the send button
sendButton.addEventListener("click", sendMessage);

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        // Display the user's message
        addMessage(message, "user");
        
        // Simulate a bot reply
        setTimeout(() => {
            addMessage(generateBotReply(message), "bot");
        }, 1000);
    }
    // Clear the input field
    messageInput.value = "";
}

// Function to add a message to the chat box
function addMessage(text, sender) {
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}`;
    messageElement.textContent = text;
    chatBox.appendChild(messageElement);

    // Scroll to the bottom
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to generate bot replies (basic logic)
function generateBotReply(userMessage) {
    const replies = [
        "Hello! How can I help you?",
        "That's interesting. Tell me more!",
        "I'm here to chat!",
        "Can you explain that further?",
        "Have a great day!"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
}
