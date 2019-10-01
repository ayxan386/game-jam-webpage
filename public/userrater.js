function showRateUI() {
  $("#user-rate").css("display", "initial");
}

function hideRateUI() {
  $("#user-rate").css("display", "none");
}

window.onkeydown = e => {
  if (e.key == "Escape") {
    hideRateUI();
  }
};

$("#rate-form").submit(event => {
  event.preventDefault();
  const data = {
    rated: $("input[name=ratedname]").val(),
    gameplay: $("input[name=gameplay]").val(),
    controll: $("input[name=controll]").val(),
    ui: $("input[name=ui]").val(),
    graphics: $("input[name=graphics]").val(),
    sfx: $("input[name=sfx]").val()
  };
  $.ajax({
    method: "PUT",
    url: "/rateuser",
    data
  }).done(data => {
    if (!data) {
      $("#user-rate").css("backgroud", "#0e0");
      setTimeout(() => {
        $("#user-rate").css("backgroud", "rgba(230, 230, 230, 0.75);");
      }, 500);
    }
  });
  event.target.reset();
});
