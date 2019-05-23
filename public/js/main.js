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

const $channels = document.getElementById("channels");

// Get user from Local Storage
const searchUSer = document.getElementById("current_user");
const savedUser = localStorage.getItem("currentUser");
searchUSer.innerText = `${savedUser}`;

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

// Channels
// Initialize channels
let channelItems = document.getElementsByClassName("channel-item");
channelItems = Array.from(channelItems);

channelItems.map(channelItem => {
  const channelName = channelItem.innerText.slice(2);
  channelItem.addEventListener("click", () => renderComments(channelName));
});

function addChannel(name) {
  const channel = {
    name: name,
    messages: []
  };

  currentChannels.push(channel);
  saveChannelStorage();
}

function addChannelListener() {
  let channelFromPrompt = window.prompt("Add new channel,here", "defaultText");

  if (channelFromPrompt != null) {
    addChannel(channelFromPrompt);
    renderChannel(currentChannels);
  }
}

function renderChannel(list) {
  $channels.innerHTML = "";
  return list.map(channel => {
    let p = document.createElement("p");

    p.innerHTML = `<p class="channel-item" ># ${channel.name}</p>`;
    $channels.appendChild(p);
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
      user: localStorage.getItem("currentUser")
    })
  );
}

// Sent messages using the form
function makeComment() {
  let inputMessage = document.getElementById("input-message").value;
  console.log(send(inputMessage));
}

// Render the messages TO DO
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