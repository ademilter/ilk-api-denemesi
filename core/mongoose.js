var mongoose = require("mongoose"),
  fs = require("fs"),
  models_path = process.cwd() + "/model";

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/ilk-api-denemesi");

var db = mongoose.connection;

db.on("error", function (err) {
  console.log("Mongo connection error: ", err);
});

db.once('open', function callback() {
  console.info('MongoDB connection is established');
});

db.on("open", function (err) {
  console.log("Mongo connection oke.");
});

fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf(".js")) {
    require(models_path + "/" + file)
  }
});