const currentChannels = [
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
  },
  {
    name: "varios",
    messages: [
      {
        author: "Ricardo",
        content: "Hola",
        timestamp: new Date()
      },
      {
        author: "Valeria",
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
  saveChannelStorage(name);
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

const titlePlus = document.getElementById("title-plus");
titlePlus.addEventListener("click", addChannelListener);
renderChannel(currentChannels);

const searchUSer = document.getElementById("current_user");
const savedUser = localStorage.getItem("currentUSer");
searchUSer.innerText = `${savedUser}`;
console.log(savedUser);

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
      message: msg
    })
  );
}

function addListener() {
  const channelItem = document.getElementsByClassName("channel-item");
  for (i = 0; i < channelItem.length; i++) {
    channelItem[i].addEventListener("click", saveChannelStorage);
  }
}

function saveChannelStorage(channel) {
  localStorage.setItem(channel, channel);
}

function showChannelStorage() {
  for (var i = 0; i < localStorage.length; i++) {
    addChannel(localStorage.key(i));
  }
  renderChannel(currentChannels);
}

showChannelStorage();
