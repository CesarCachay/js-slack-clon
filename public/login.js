let currentUser = "";

function Login() {
  var usuario = document.login.usuario.value;
  if (usuario != "") {
    localStorage.setItem("currentUSer", usuario);
    window.location = "index.html";
  }
  if (usuario == "") {
    alert("You need to write a username!!");
  }
}