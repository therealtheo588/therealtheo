<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat App with Admin Console</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: 0;
            height: 100vh;
            background-color: #f3f4f6;
        }
        #chat-box {
            width: 90%;
            max-width: 600px;
            height: 400px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background: white;
            overflow-y: auto;
            padding: 10px;
        }
        .message {
            margin: 5px 0;
        }
        .message.user {
            text-align: right;
            color: #0078d4;
        }
        #input-box {
            display: flex;
            margin-top: 10px;
            width: 90%;
            max-width: 600px;
        }
        #input-box input {
            flex: 1;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 8px 0 0 8px;
            outline: none;
        }
        #input-box button {
            padding: 10px;
            border: none;
            background-color: #0078d4;
            color: white;
            border-radius: 0 8px 8px 0;
            cursor: pointer;
        }
        #input-box button:hover {
            background-color: #005bb5;
        }
        .admin-console {
            display: none;
            margin-top: 20px;
        }
    </style>
</head>
<body>

    <div id="chat-box"></div>

    <div id="input-box">
        <input type="text" id="message-input" placeholder="Type your message..." />
        <button id="send-btn">Send</button>
    </div>

    <div class="admin-console">
        <input type="text" id="admin-input" placeholder="Enter admin command..." />
        <button id="admin-btn">Execute</button>
        <div id="admin-output"></div>
    </div>

    <script>
        const sendButton = document.getElementById('send-btn');
        const messageInput = document.getElementById('message-input');
        const chatBox = document.getElementById('chat-box');

        const adminPassword = "04428";
        let isAdmin = false;

        sendButton.addEventListener('click', () => {
            const messageText = messageInput.value;
            if (messageText) {
                addUserMessage(messageText);
                
                // Check if the message is an admin command
                if (messageText.toLowerCase() === `admin = ${adminPassword}`) {
                    isAdmin = true;
                    toggleAdminConsole();
                    addAdminMessage("Admin access granted. You can now use admin commands.");
                } else {
                    generateAIResponse(messageText);
                }
                
                messageInput.value = '';
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
            }
        });

        // Function to add user message to chat
        function addUserMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'user');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
        }

        // Function to add admin message to chat
        function addAdminMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', 'ai');
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
        }

        // Function to generate AI response
        function generateAIResponse(userMessage) {
            const responseElement = document.createElement('div');
            responseElement.classList.add('message', 'ai');
            let aiResponse;

            const lowerCaseMessage = userMessage.toLowerCase();
            if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                aiResponse = "Hello! How can I assist you today?";
            } else if (lowerCaseMessage.includes('how are you')) {
                aiResponse = "I'm just a program, but thanks for asking!";
            } else if (lowerCaseMessage.includes('help')) {
                aiResponse = "Sure! What do you need help with?";
            } else if (lowerCaseMessage.includes('what is your name')) {
                aiResponse = "I am a simple chat bot created to assist you.";
            } else if (lowerCaseMessage.includes('bye')) {
                aiResponse = "Goodbye! Have a great day!";
            } else {
                aiResponse = "I'm sorry, I don't quite understand that. Can you please rephrase?";
            }

            responseElement.textContent = aiResponse;
            chatBox.appendChild(responseElement);
        }

        // Admin console functionality
        function toggleAdminConsole() {
            const adminConsole = document.querySelector('.admin-console');
            adminConsole.style.display = isAdmin ? 'block' : 'none';
        }

        document.getElementById('admin-btn').addEventListener('click', () => {
            const commandInput = document.getElementById('admin-input');
            const command = commandInput.value;
            const outputElement = document.getElementById('admin-output');
            
            if (isAdmin) {
                // Execute admin commands here
                if (command === 'clear chat') {
                    chatBox.innerHTML = ''; // Clears the chat
                    outputElement.textContent = "Chat cleared.";
                } else {
                    outputElement.textContent = "Unknown command.";
                }
            } else {
                outputElement.textContent = "You need to be an admin to execute commands.";
            }

            commandInput.value = ''; // Clear input after execution
        });

        // Optional: Allow sending message with Enter key
        messageInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                sendButton.click();
            }
        });
    </script>

</body>
</html>