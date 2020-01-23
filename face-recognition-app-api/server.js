const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const dataBase = {
  users: [
    {
      id: "123",
      name: "Jhon",
      password: "cookies",
      email: "jhon@mail.com",
      entries: 0,
      joined: new Date()
    },
    {
      id: "456",
      name: "Sally",
      password: "bananas",
      email: "sally@mail.com",
      entries: 0,
      joined: new Date()
    }
  ],
  login: [
    {
      id: 987,
      hash: "",
      email: "jhon@mail.com"
    }
  ]
};

app.get("/", (req, res) => {
  res.send(dataBase.users);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === dataBase.users[0].email &&
    req.body.password === dataBase.users[0].password
  ) {
    res.json(dataBase.users[0]);
  } else {
    res.status(400).json("Error loginIn!");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  dataBase.users.push({
    id: "789",
    name: name,
    email: email,
    entries: 0,
    joined: new Date()
  });

  res.json(dataBase.users[dataBase.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;

  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;
      return res.json(user);
    }
  });
  if (!found) {
    return res.status(400).json("User not found!");
  }
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  let found = false;

  dataBase.users.forEach(user => {
    if (user.id === id) {
      found = true;

      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    return res.status(400).json("Not Found!");
  }
});

app.listen(4000, () => {
  console.log("App is running");
});

/* 
/ --> res = this is working
/signin --> POST = success/fail --- POST FOR PASSWORD
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/
