const express = require("express");
const mongoose = require("mongoose");
const Members = require("./model");
require("dotenv/config");

const app = express();
const PORT = 4040;
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const newUser = new Members({ name, email, password, phoneNumber });
  await newUser.save();
  return res.status(200).send(newUser);
});

app.post("/signin", async (req, res) => {
  const findUser = await Members.findOne({ email: req.body.email });
  console.log(findUser);
  if (findUser && findUser.password === req.body.password) {
    return res.status(201).send(findUser);
  } else {
    return res.status(404).send("Input valid user details");
  }
});

mongoose.connect(process.env.MongoDB);
app.listen(PORT, () => {
  console.log("Server is running on port" + PORT);
});
