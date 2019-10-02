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
        //console.log(doc);

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
          phone: req.body.phone,
          nickname: req.body.nickname,
          rates: {}
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
          let mess = "";
          if (!doc.isGoing) {
            if (doc.start != -1 && doc.deadline != -1) {
              if (doc.selected.length > 1) {
                doc.isGoing = true;
              } else {
                mess += "Set the topic first";
              }
            } else {
              mess += "Set the deadline first";
            }
          } else if (doc.isGoing) {
            doc.start = -1;
            doc.deadline = -1;
            doc.selected = "";
            doc.isGoing = false;
            mess = "Jam stopped";
          }
          db.collection("gameJam").save(doc);
          res.send(mess);
        }
      }
    });
  });
  app.put("/endofterm", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        if (doc.deadline < Date.now()) {
          if (doc.password == req.body.pass) {
            doc.isGoing = false;
            if (!doc.isGoing) {
              doc.start = -1;
              doc.deadline = -1;
              doc.selected = "";
            }
            db.collection("gameJam").save(doc);
          }
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
  app.put("/resetuserdata", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        if (doc.password == req.body.pass) {
          doc.participants = [];
          db.collection("gameJam").save(doc);
          res.send("Success");
        }
      }
    });
  });
  app.put("/rateuser", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        //console.log(doc.participants);
        for (let i = 0; i < doc.participants.length; i++) {
          let part = doc.participants[i];
          if (part.nickname == req.body.rated) {
            part.rates = {
              gameplay: part.rates.gameplay
                ? (Number.parseFloat(part.rates.gameplay) +
                    Number.parseFloat(req.body.gameplay)) /
                  2
                : req.body.gameplay,
              controll: part.rates.controll
                ? (Number.parseFloat(part.rates.controll) +
                    Number.parseFloat(req.body.controll)) /
                  2
                : req.body.controll,
              ui: part.rates.ui
                ? (Number.parseFloat(part.rates.ui) +
                    Number.parseFloat(req.body.ui)) /
                  2
                : req.body.ui,
              graphics: part.rates.graphics
                ? (Number.parseFloat(part.rates.graphics) +
                    Number.parseFloat(req.body.graphics)) /
                  2
                : req.body.graphics,
              sfx: part.rates.sfx
                ? (Number.parseFloat(part.rates.sfx) +
                    Number.parseFloat(req.body.sfx)) /
                  2
                : req.body.sfx
            };
            break;
          }
        }
        db.collection("gameJam").save(doc);
      }
    });
  });
  app.get("/myrates", (req, res) => {
    res.sendFile(path.join(__dirname, "/views", "rates.html"));
  });
  app.get("/getrates", (req, res) => {
    db.collection("gameJam").findOne({}, (err, doc) => {
      if (err) console.log(err);
      if (doc) {
        //console.log(req.query);
        let partRes = null;
        doc.participants.forEach(part => {
          //console.log(part);
          if (part.email == req.query.email) {
            partRes = part;
          }
        });
        //  console.log(partRes);
        if (partRes) {
          res.send({ rates: partRes.rates });
        }
      }
    });
  });
};
