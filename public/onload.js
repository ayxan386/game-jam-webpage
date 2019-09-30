window.onload = () => {
  listParticipants();
};

function listParticipants() {
  $.ajax({
    url: "/parti",
    method: "GET"
  }).done(data => {
    data.forEach(el => {
      if (el.nickname) {
        let temp = document.createElement("li");
        temp.className = "list-group-item";
        temp.innerHTML = el.nickname;
        $("#parti-list").append(temp);
      }
    });
  });
}
