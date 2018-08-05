const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var socket = require("socket.io");

const register = require("./routes/api/register");
const faq = require("./routes/api/faq");
const searchtoken = require("./routes/api/searchtoken");
const path = require("path");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongo db connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello world"));

//use Routes
app.use("/api/register", register);
app.use("/api/faq", faq);
app.use("/api/searchtoken", searchtoken);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//asign port no
var server = app.listen(process.env.PORT || 5000, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
// const port = process.env.PORT || 5000;
// var server = app.listen(port, () => console.log("server running at" + port));
var io = socket(server);

io.on("connection", socket => {
  console.log(socket.id);

  socket.on("SEND_MESSAGE", function(data) {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
