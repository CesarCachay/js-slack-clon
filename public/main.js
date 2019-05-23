const currentChannels = [
  // {
  //   name: "general",
  //   messages: [
  //     {
  //       author: "Yo",
  //       content: "Hola",
  //       timestamp: new Date()
  //     },
  //     {
  //       author: "Ricardo",
  //       content: "bebe",
  //       timestamp: new Date()
  //     }
  //   ]
  // },
  // {
  //   name: "varios",
  //   messages: [
  //     {
  //       author: "Ricardo",
  //       content: "Hola",
  //       timestamp: new Date()
  //     },
  //     {
  //       author: "Valeria",
  //       content: "bebe",
  //       timestamp: new Date()
  //     }
  //   ]
  // }
];

console.log(currentChannels);

function addChannel(name) {
  const channel = {
    name: name,
    messages: []
  };

  currentChannels.push(channel);
}
// addChannel("love");
// console.log(currentChannels);

const $channels = document.getElementById("channels");

function renderChannel(list) {
  let html = "";
  list.forEach(channel => {
    html += `<p class="channel-item" data-name="${channel.name}"># ${
      channel.name
    }</p>`;
  });
  $channels.innerHTML = html;
  addListener();
}

function addChannelListener() {
  let channelFromPrompt = window.prompt("Add new channel,here", "defaultText");

  if (channelFromPrompt != null) {
    addChannel(channelFromPrompt);
    renderChannel(currentChannels);
  }

  addChannel("name");
  renderChannel(currentChannels);
}

const titlePlus = document.getElementById("title-plus");
titlePlus.addEventListener("click", addChannelListener);
renderChannel(currentChannels);

function addListener() {
  const channelItem = document.getElementsByClassName("channel-item");
  for (i = 0; i < channelItem.length; i++) {
    channelItem[i].addEventListener("click", saveChannelStorage);
  }
}

function saveChannelStorage() {
  const channel = this.dataset.name;
  console.log(channel);
  if (localStorage.getItem("lastIndex") == null) {
    localStorage.setItem("lastIndex", "1");
    localStorage.setItem("0", channel);
  } else {
    let index = localStorage.getItem("lastIndex");
    localStorage.setItem(index, channel);

    index = (1 + +index).toString();
    localStorage.setItem("lastIndex", index);
  }
}

//When the page is reload
function showChannelStorage() {
  for (i = 0; i < localStorage.length - 1; i++) {
    addChannel(localStorage.getItem(i));
  }
  renderChannel(currentChannels);
}

showChannelStorage();
