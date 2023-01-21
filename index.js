const express = require('express');
const cors = require("cors");
const app = express();
const port = 8080;
require("dotenv").config();
app.use(express.json())
const mongoose = require("mongoose");
MongoDbURL = process.env.MONGODB_URL;
mongoose.connect(MongoDbURL);
var db= mongoose.connection

db.on("error", console.error.bind(console, "Connection error : "));
db.once("open", function () {
  console.log("Database is Ready.... ");
});

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/user", require("./src/routes/userRoutes"));
app.use("/api/event", require("./src/routes/eventRoutes"));
app.use("/api/guest", require("./src/routes/guestRoutes"));


app.get('/*', (req, res) => {
  res.send('invalid Request')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})