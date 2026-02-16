const socket = io("http://localhost:3000");


const addRecieverMessage = (message)=>{
    const log = document.querySelector('.message-log');
    const newMessage = document.createElement('div');
    newMessage.style.backgroundColor = "grey";
    newMessage.style.width = "100%";
    newMessage.style.height = "auto";
    newMessage.style.color = "white";
    newMessage.innerText = message;
    log.appendChild(newMessage);
}

const addSenderMessage = (message)=>{
    const log = document.querySelector('.message-log');
    const newMessage = document.createElement('div');
    newMessage.style.backgroundColor = "rgb(202, 221, 250)";
    newMessage.style.width = "100%";
    newMessage.style.height = "auto";
    newMessage.innerText = message;
    log.appendChild(newMessage);
}

addRecieverMessage("you")
addSenderMessage("them");