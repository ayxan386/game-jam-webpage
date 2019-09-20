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
    phone: $("input[name=phone-number]").val()
  };
  $.ajax({
    url: "/parti",
    method: "POST",
    data: body
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
    $("#index").html(`Topic : ${data.topic}`);
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
  });
});
