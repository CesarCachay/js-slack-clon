let currentUser = "";

function Login() {
  var usuario = document.login.usuario.value;
  if (usuario != "") {
    localStorage.setItem("currentUser", usuario);
    window.location = "main.html";
  }
  if (usuario == "") {
    alert("You need to write a username!!");
  }
}