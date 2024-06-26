const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.DBPASSWORD);

const PetShcema = new mongoose.Schema({
  name: String,
  species: String,
  breed: String,
  age: Number,
  gender: String,
});

const applicationSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
});

const Pet = mongoose.model("Pet", PetShcema);

const Application = mongoose.model("Application", applicationSchema);

module.exports = {
  Pet,
  Application,
};
