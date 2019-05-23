let currentChannels = [
  {
    name: "general",
    messages: [
      {
        author: "Yo",
        content: "Hola",
        timestamp: new Date()
      },
      {
        author: "Ricardo",
        content: "bebe",
        timestamp: new Date()
      }
    ]
  }
];

console.log(currentChannels);

function addChannel(name) {
  const channel = {
    name: name,
    messages: []
  };

  currentChannels.push(channel);
  saveChannelStorage();
}

const $channels = document.getElementById("channels");

function renderChannel(list) {
  $channels.innerHTML = "";
  return list.map(channel => {
    let p = document.createElement("p");

    p.innerHTML = `<p class="channel-item" ># ${channel.name}</p>`;
    $channels.appendChild(p);
  });
}

function addChannelListener() {
  let channelFromPrompt = window.prompt("Add new channel,here", "defaultText");

  if (channelFromPrompt != null) {
    addChannel(channelFromPrompt);
    renderChannel(currentChannels);
  }
}

function renderComments(channelName) {
  let channel = currentChannels.find(obj => {
    return obj.name === channelName;
  });

  let msgDisplay = document.getElementsByClassName("msg-display")[0];
  msgDisplay.innerHTML = "";
  channel.messages.forEach(channelMessage => {
    const p = document.createElement("p");
    p.innerHTML = `<p class="message-item">${channelMessage.author} : ${
      channelMessage.content
    } ${channelMessage.timestamp}</p>`;
    msgDisplay.appendChild(p);
  });
}

let channelItems = document.getElementsByClassName("channel-item");
channelItems = Array.from(channelItems);

channelItems.map(channelItem => {
  const channelName = channelItem.innerText.slice(2);
  channelItem.addEventListener("click", () => renderComments(channelName));
});

/// server

const searchUSer = document.getElementById("current_user");
const savedUser = localStorage.getItem("currentUSer");
searchUSer.innerText = `${savedUser}`;
// console.log(savedUser);

const socket = new WebSocket("ws://localhost:3000/connection");

socket.addEventListener("open", () => {
  console.log("Connection open");
});
socket.addEventListener("close", () => {
  alert("Connection closed");
});
socket.addEventListener("message", event => {
  console.log("Message: %s", event.data);
});

function send(msg) {
  socket.send(
    JSON.stringify({
      message: msg,
      user: localStorage.getItem("currentUser")
    })
  );
}

function saveChannelStorage() {
  localStorage.setItem("currentChannels", JSON.stringify(currentChannels));
}

function makeComment() {
  let inputMessage = document.getElementById("input-message").value;
  console.log(send(inputMessage));
}

const titlePlus = document.getElementById("title-plus");
titlePlus.addEventListener("click", addChannelListener);

var localChannels = localStorage.getItem("currentChannels");
if (localChannels == null) {
  saveChannelStorage();
} else {
  currentChannels = JSON.parse(localChannels);
}
renderChannel(currentChannels);
