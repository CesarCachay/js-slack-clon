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
  return list.map(channel => {
    let p = document.createElement("p");

    p.innerHTML = `<p class="channel-item"># ${channel.name}</p>`;
    $channels.appendChild(p);
  });
}

renderChannel(currentChannels);
