const searchUSer = document.getElementById("current_user");
const savedUser = localStorage.getItem("currentUSer");
searchUSer.innerText = `Welcome ${savedUser}`;
console.log(savedUser);
