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
}
addChannel("love");
console.log(currentChannels);

const $channels = document.getElementById("channels");

function renderChannel(list) {
  $channels.innerHTML = "";
  return list.map(channel => {
    let p = document.createElement("p");

    p.innerHTML = `<p class="channel-item"># ${channel.name}</p>`;
    $channels.appendChild(p);
  });
}

function addChannelListener() {
  addChannel("name");
  renderChannel(currentChannels);
}

const titlePlus = document.getElementById("title-plus");
titlePlus.addEventListener("click", addChannelListener);
renderChannel(currentChannels);

const searchUSer = document.getElementById("current_user");
const savedUser = localStorage.getItem("currentUSer");
searchUSer.innerText = `${savedUser}`;
console.log(savedUser);
