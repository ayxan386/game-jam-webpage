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
