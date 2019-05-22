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

function addChannel(name){
  const channel =  {
    name: name,
    messages: []
  }
  
  currentChannels.push(channel)
}
  addChannel("love");
  console.log(currentChannels);

  