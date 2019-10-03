//Sends topic name to /topic url
$("#topic-form").submit(event => {
  event.preventDefault();
  let body = {
    topic: $("input[name=topic]").val()
  };
  $.ajax({
    url: "/topic",
    method: "POST",
    data: body
  });
  event.target.reset();
});

//Sends participant information to the backend
$("#parti-reg").submit(event => {
  event.preventDefault();
  let body = {
    fullName: $("input[name=full-name]").val(),
    email: $("input[name=email]").val(),
    phone: $("input[name=phone-number]").val(),
    nickname: $("input[name=nickname]").val()
  };
  $.ajax({
    url: "/parti",
    method: "POST",
    data: body
  }).done(data => {
    if (!data) {
      $("#parti-message").html("Successfully registered");
    }
  });
  event.target.reset();
});

//Selects new random topic
$("#index-selector").submit(event => {
  event.preventDefault();
  $.ajax({
    url: "/randomIndex",
    method: "PUT",
    data: { pass: prompt("Password Please") }
  }).done(data => {
    $("#index-message").html(`Topic : ${data.topic}`);
  });
});
$("#reset-users").submit(event => {
  event.preventDefault();
  $.ajax({
    url: "/resetuserdata",
    method: "PUT",
    data: { pass: prompt("Password Please") }
  }).done(data => {
    $("#reset-message").html(`${data}`);
  });
});

//Sets the deadline for the competition
$("#date-selectors").submit(event => {
  event.preventDefault();
  const data = {
    start: $("input[name=start]").val() + " 06:00:00",
    end: $("input[name=end]").val() + " 06:00:00",
    pass: prompt("Pasword please")
  };
  //console.log(data);
  $.ajax({
    url: "/setDates",
    method: "POST",
    data: data
  });
  event.target.reset();
});

//Starting/stopping competion
$("#starter").submit(event => {
  let pass = prompt("Password please");
  event.preventDefault();
  $.ajax({
    url: "/start",
    method: "PUT",
    data: { pass }
  }).done(data => {
    if (data) {
      $("#message-board").html(data);
    }
  });
});
//Starting/stopping competion
$("#auto-starter").submit(event => {
  let pass = prompt("Password please");
  event.preventDefault();
  $.ajax({
    url: "/autostart",
    method: "PUT",
    data: { pass }
  }).done(data => {
    if (data) {
      $("#message-board").html(data);
    }
  });
});
