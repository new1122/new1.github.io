var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/a-c");

var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobn: Number,
    eid: String,
    texta: String
  });
  
var User = mongoose.model("User", nameSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post("/addname", (req, res) => {
    var myData = new User(req.body);
    myData.save()
      .then(item => {
        res.send("congratulations!! Your data is successfully stored...You can Login now By email Id as User ID and Your First name as password.");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  });
  
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
