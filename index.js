const express = require("express");
const model = require("./model");
require("dotenv").config();

const app = express();

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.get("/pets", async (request, response) => {
  try {
    const pets = await model.Pet.find();
    response.status(200).json(pets);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.post("/pets", async (request, response) => {
  const newPet = new model.Pet({
    name: request.body.name,
    species: request.body.species,
    breed: request.body.breed,
    age: request.body.age,
    gender: request.body.gender,
  });
  try {
    const savedPet = await newPet.save();
    response.status(200).json(savedPet);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.get("/applications", async (request, response) => {
  try {
    const applications = await model.Application.find();
    response.status(200).json(applications);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.post("/applications", async (request, response) => {
  const newApplication = new model.Application({
    name: request.body.name,
    phoneNumber: request.body.phoneNumber,
    email: request.body.email,
  });
  try {
    const savedApplication = await newApplication.save();
    response.status(200).json(savedApplication);
  } catch (error) {
    console.log(error);
    response.status(404).send("Generic Error");
  }
});

app.listen(8080, () => {
  console.log("Server is runngin: http://localhost:8080");
});
