const path = require("path");

module.exports = (app, db) => {
  app.route("/").get((req, res) => {
    res.sendFile(path.join(__dirname, "./views", "index.html"));
  });
  app
    .route("/topic")
    .post((req, res) => {
      db.collection("gameJam").findOne({}, (err, doc) => {
        if (err) console.log(err);
        console.log(doc);

        if (!doc) {
          doc = {
            participants: [],
            topics: [],
            deadline: 0,
            start: 0,
            selected: -1,
            isGoing: false
          };
        }
        doc.topics.push(req.body.topic);
        // console.log("adding topic");
        db.collection("gameJam").save(doc);
      });
    })
    .get((req, res) => {
      db.collection("gameJam").findOne({}, (err, doc) => {
        if (err) console.log(err);
        if (doc) {
          res.send(doc.topics);
        }
      });
    });
  app
    .route("/parti")
    .post((req, res) => {
      db.collection("gameJam").findOne({}, (err, doc) => {
        if (err) console.log(err);
        if (!doc) {
          doc = {
            participants: [],
            topics: [],
            deadline: 0,
            start: 0,
            selected: -1,
            isGoing: false
          };
        }
        const parti = {
          name: req.body.fullName,
          email: req.body.email,
          phone: req.body.phone
        };
        doc.participants.push(parti);
        db.collection("gameJam").save(doc);
      });
    })
    .get((req, res) => {
      db.collection("gameJam").findOne({}, (err, doc) => {
        if (err) console.log(err);
        if (doc) {
          res.send(doc.participants);
        }
      });
    });
  app.route("/adminsonly").get((req, res) => {
    res.sendFile(path.join(__dirname, "./views", "competitionPage.html"));
  });
  app.put("/randomIndex", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        if (doc.password == req.body.pass) {
          let topic;
          if (doc.selected === "") {
            let index = Math.floor(Math.random() * doc.topics.length);
            doc.selected = doc.topics[index];
            topic = doc.topics[index];
            db.collection("gameJam").save(doc);
          } else {
            topic = doc.selected;
          }
          res.send({ topic });
        }
      }
    });
  });
  app.post("/setDates", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        if (doc.password == req.body.pass) {
          doc.start = Date.parse(req.body.start);
          doc.deadline = Date.parse(req.body.end);
          db.collection("gameJam").save(doc);
        }
      }
    });
  });
  app.put("/start", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        // console.log(req.body);
        // console.log(doc);

        if (doc.password == req.body.pass) {
          doc.isGoing = !doc.isGoing;
          if (!doc.isGoing) {
            doc.start = -1;
            doc.deadline = -1;
            doc.selected = "";
          }
          db.collection("gameJam").save(doc);
        }
      }
    });
  });
  app.get("/competitionInfo", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        const data = {
          isGoing: doc.isGoing,
          start: doc.start,
          deadline: doc.deadline,
          topic: doc.selected
        };
        res.send(data);
      }
    });
  });
};
