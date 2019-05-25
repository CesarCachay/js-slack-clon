let currentChannels = [
  {
    name: "general",
    messages: [
      {
        author: "Mancito",
        content: "Hola",
        timestamp: new Date("May 22, 2016 15:00:00")
      },
      {
        author: "Ricardo",
        content: "como estas?",
        timestamp: new Date("May 22, 2016 16:00:00")
      },
      {
        author: "Mancito",
        content: "muy bien",
        timestamp: new Date("May 23, 2016 15:00:00")
      },
      {
        author: "Ricardo",
        content: "tu",
        timestamp: new Date("May 23, 2016 15:00:00")
      },
      {
        author: "Mancito",
        content: "muy bien too",
        timestamp: new Date("May 24, 2019 15:00:00")
      }
    ]
  }
];

const socket = new WebSocket("ws://localhost:3000/connection");
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
  if (findChannelByName(name)) {
    console.log("already exists");
    return;
  }

  const channel = {
    name: name,
    messages: []
  };

  currentChannels.push(channel);
  saveChannelStorage();
  return currentChannels[currentChannels.length - 1];
}

function addChannelListener() {
  let channelFromPrompt = window
    .prompt("Add new channel,here", "")
    .replace(/\s/g, "_");

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
  // {message: "Esto fue una prueba", user: "CesarCachay", channel: "varios"}
  console.log("received message: ", inputMessage);
  const newMessage = {
    author: inputMessage.user,
    content: inputMessage.message,
    timestamp: new Date()
  };

  let channel = findChannelByName(inputMessage.channel);

  if (channel == undefined) {
    channel = addChannel(inputMessage.channel);
    renderChannel(currentChannels);
  }

  channel.messages.push(newMessage);
  saveChannelStorage();
  renderComments(activeChannel);

  if (localStorage.getItem("currentUser") !== newMessage.author) {
    const sound = new Audio("../assets/notification-sound.mp3");
    sound.play();
  }
}

function makeComment() {
  let inputElement = document.getElementById("input-message");
  let inputMessage = inputElement.value;
  if (inputMessage != "") {
    send(inputMessage);
    inputElement.parentElement.reset();
  }
}

function findChannelByName(channelName) {
  return currentChannels.find(obj => {
    return obj.name === channelName;
  });
}
// Render the messages TO DO
function renderComments(channelName) {
  localStorage.setItem("activeChannel", channelName);
  document.getElementById("channel-title").innerText = `#${channelName}`;
  activeChannel = channelName;

  let channel = findChannelByName(channelName);
  console.log(channel);

  let msgDisplay = document.getElementsByClassName("msg-display")[0];
  msgDisplay.innerHTML = "";

  var tempTime = "";
  channel.messages.forEach(channelMessage => {
    const divMessageGroup = document.createElement("hr");
    divMessageGroup.className = "message-group";
    let savedTime = new Date(channelMessage.timestamp);

    // Comparison of dates for group
    if (savedTime.toDateString() === new Date().toDateString()) {
      divMessageGroup.innerHTML = "Today";
    } else if (savedTime.toDateString() === calDateBefore()) {
      divMessageGroup.innerHTML = "Yesterday";
    } else {
      divMessageGroup.innerHTML = `${savedTime.toDateString()}`;
    }

    const divMessage = document.createElement("div");
    //Render messages
    divMessage.innerHTML = `<div class="single-message">
      <img src="./assets/user_icon.png" alt="user's icon">
      <div class="written-part-msg">
        <p class="message-item"><span class="msg-author">${
          channelMessage.author
        }</span> <span class="msg-date">${savedTime.toLocaleTimeString(
      undefined,
      {
        hour: "2-digit",
        minute: "2-digit"
      }
    )}</span></p> <p class="msg-content">${
      channelMessage.content
    }</p></div></div>`;

    //For grouping messages
    if (savedTime.getDate() != tempTime) {
      msgDisplay.appendChild(divMessageGroup);
      msgDisplay.appendChild(divMessage);
    } else {
      msgDisplay.appendChild(divMessage);
    }
    tempTime = savedTime.getDate();
  });
  document
    .querySelector(".msg-display")
    .scrollTo(0, document.querySelector(".msg-display").scrollHeight);
}

function calDateBefore() {
  var datenew = new Date();
  var beforeDate = datenew.getDate() - 1;
  datenew.setDate(beforeDate);
  return datenew.toDateString();
}

/// Server

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
