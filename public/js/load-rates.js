window.onload = () => {
  let url = new URLSearchParams(window.location.search);
  let email = "";
  if (url.get("email")) {
    email = url.get("email");
  } else {
    window.location.replace("/");
  }
  $.ajax({
    method: "GET",
    url: "/getrates" + "?email=" + email
  }).done(data => {
    const { rates } = data;
    console.log(rates);
    let item = document.createElement("li");
    item.className = "list-group-item";
    item.innerHTML = "Gameplay : " + rates["gameplay"] + "/10";
    $("#rates").append(item);

    item = document.createElement("li");
    item.className = "list-group-item";
    item.innerHTML = "Controll System : " + rates["controll"] + "/10";
    $("#rates").append(item);

    item = document.createElement("li");
    item.className = "list-group-item";
    item.innerHTML = "User interface : " + rates["ui"] + "/10";
    $("#rates").append(item);

    item = document.createElement("li");
    item.className = "list-group-item";
    item.innerHTML = "Graphics : " + rates["graphics"] + "/10";
    $("#rates").append(item);

    item = document.createElement("li");
    item.className = "list-group-item";
    item.innerHTML = "Sound effects : " + rates["sfx"] + "/10";
    $("#rates").append(item);
  });
};
