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
    url: "/randomIndex"
  }).done(data => {
    $("#index").html(`Topic : ${data.topic}`);
  });
});

//Sets the deadline for the competition
$("#date-selectors").submit(event => {
  event.preventDefault();
  const data = {
    start: $("input[name=start]").val() + " 06:00:00",
    end: $("input[name=end]").val() + " 06:00:00"
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
  event.preventDefault();
  $.ajax({
    url: "/start",
    method: "PUT"
  });
});
//Getting information about data,
//if jam is running then start the countdown
let timeTillEnd = 0;
let id;
window.onload = () => {
  $.ajax({
    url: "/competitionInfo"
  }).done(data => {
    if (data.isGoing) {
      //Doing some calculations for the countdown
      if (Date.now() > data.start) {
        //Displaying topic name
        $("#topic").html("Topic is " + data.topic);

        timeTillEnd = Math.floor((data.deadline - Date.now()) / 1000);
        // console.log(timeTillEnd);
        id = setInterval(() => {
          timeTillEnd--;
          displayTime(timeTillEnd);
          if (timeTillEnd == 0) clearInterval(id);
        }, 1000);
      } else {
        $("#topic").html("Competion has not started yet");
        timeTillEnd = Math.floor((data.start - Date.now()) / 1000);
        // console.log(timeTillEnd);
        id = setInterval(() => {
          timeTillEnd--;
          displayTime(timeTillEnd, true);
          if (timeTillEnd == 0) clearInterval(id);
        }, 1000);
      }
    }
  });
};

function displayTime(Totalseconds, starts = false) {
  let seconds = Math.floor(Totalseconds % 60);
  let minutes = Math.floor(Totalseconds / 60);
  let hours = Math.floor(minutes / 60);
  minutes %= 60;
  $("#countdown").html(
    `${starts ? "Starts in " : ""} ${hours}:${minutes}:${seconds}`
  );
}
