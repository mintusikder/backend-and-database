const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("userr");
});

const users = [
  { id: 1, name: "mintu", email: "mintu@s.com" },
  { id: 2, name: "sikder", email: "sikder@s.com" },
  { id: 3, name: "rakib", email: "rakib@s.com" },
];

app.get("/users", (req, res) => {
  res.send(users);
});
app.post("/users", (req, res) => {
  console.log("user post");
  console.log(req.body);
  const newUser = req.body;
  newUser.id = users.length + 1;
  //add to data base 
  users.push(newUser)
  res.send(newUser);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
