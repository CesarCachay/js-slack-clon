let currentChannels = [
  {
    name: "general",
    messages: [
      {
        author: "Yo",
        content: "Hola",
        timestamp: new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit"
        })
      },
      {
        author: "Ricardo",
        content: "bebe",
        timestamp: new Date().toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit"
        })
      }
    ]
  }
];

const $channels = document.getElementById("channels");

// Get user from Local Storage
const searchUSer = document.getElementById("current_user");
const savedUser = localStorage.getItem("currentUser");
searchUSer.innerHTML = `<i class="fas fa-circle"></i> ${savedUser}`;

// Initialize

const titlePlus = document.getElementById("title-plus");
titlePlus.addEventListener("click", addChannelListener);

var localChannels = localStorage.getItem("currentChannels");
if (localChannels == null) {
  saveChannelStorage();
} else {
  currentChannels = JSON.parse(localChannels);
}
renderChannel(currentChannels);

var activeChannel = localStorage.getItem("activeChannel");
if (activeChannel == null) {
  localStorage.setItem("activeChannel", "general");
  activeChannel = "general";
}
renderComments(activeChannel);

// Channels
// Initialize channels

function addChannel(name) {
  const channel = {
    name: name,
    messages: []
  };

  currentChannels.push(channel);
  saveChannelStorage();
}

function addChannelListener() {
  let channelFromPrompt = window.prompt("Add new channel,here", " ");

  if (channelFromPrompt != null) {
    addChannel(channelFromPrompt);
    renderChannel(currentChannels);

    new Notification("Slack Clone", {
      body: "New channel is created"
    });
  }
}

function renderChannel(list) {
  $channels.innerHTML = "";
  list.map(channel => {
    let p = document.createElement("p");

    p.innerHTML = `<p class="channel-item" ># ${channel.name}</p>`;
    $channels.appendChild(p);
  });

  let channelItems = document.getElementsByClassName("channel-item");
  channelItems = Array.from(channelItems);

  channelItems.map(channelItem => {
    const channelName = channelItem.innerText.slice(2);
    channelItem.addEventListener("click", () => renderComments(channelName));
  });
}

function saveChannelStorage() {
  localStorage.setItem("currentChannels", JSON.stringify(currentChannels));
}

console.log(currentChannels);

// Messages
// Get the message and allows to see the author and the content of the message
function send(msg) {
  socket.send(
    JSON.stringify({
      message: msg,
      user: localStorage.getItem("currentUser"),
      channel: activeChannel
    })
  );
}

// Sent messages using the form
function receiveComment(inputMessage) {
  // {message: "Esto fue una prueba", user: "CesarCachay"}
  console.log("received message: ", inputMessage);
  const newMessage = {
    author: inputMessage.user,
    content: inputMessage.message,
    timestamp: new Date().toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  let channel = currentChannels.find(obj => {
    return obj.name === activeChannel;
  });
  channel.messages.push(newMessage);
  saveChannelStorage();
  renderComments(activeChannel);
}

function makeComment() {
  let inputElement = document.getElementById("input-message");
  let inputMessage = inputElement.value;
  send(inputMessage);
  inputElement.parentElement.reset();
}

// Render the messages TO DO
function renderComments(channelName) {
  localStorage.setItem("activeChannel", channelName);
  document.getElementById("channel-title").innerText = `#${channelName}`;
  activeChannel = channelName;
  let channel = currentChannels.find(obj => {
    return obj.name === channelName;
  });

  let msgDisplay = document.getElementsByClassName("msg-display")[0];
  msgDisplay.innerHTML = "";
  channel.messages.forEach(channelMessage => {
    const divMessage = document.createElement("div");
    divMessage.innerHTML = `<p class="message-item">${channelMessage.author} ${
      channelMessage.timestamp
    }</p> <p>${channelMessage.content}</p>`;
    msgDisplay.appendChild(divMessage);
  });
}

/// Server
const socket = new WebSocket("ws://localhost:3000/connection");

socket.addEventListener("open", () => {
  console.log("Connection open");
});
socket.addEventListener("close", () => {
  alert("Connection closed");
});
socket.addEventListener("message", event => {
  const newMessages = JSON.parse(event.data);
  receiveComment(newMessages);
});

async function askNotification() {
  let status = await Notification.requestPermission();
  if (Notification.permission !== "granted") {
    console.log("notification desactive"); // replace by notification custom
  }
}

askNotification();
