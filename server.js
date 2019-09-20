require("dotenv").config();

const express = require("express");
const app = express();

//Middleware
const bodyParser = require("body-parser");
const helmet = require("helmet");

//For parsing post request bodies
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//Giving access to clientside JS and CSS

app.use(express.static("./public"));

//Security middleware
app.use(helmet());

//Database
const MongoClient = require("mongodb").MongoClient;

//Database connection

MongoClient.connect(process.env.DB, (err, db) => {
  if (err) console.log(err);

  //Listening on port 3000
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server successfully started");
  });
  require("./routes")(app, db);
  //Page not found 404
  app.use((req, res, next) => {
    res.send("Page not found");
  });
});
