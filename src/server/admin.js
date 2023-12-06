const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 12000;

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

var data = {
  users: [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Anna", lastName: "Smith" },
    { firstName: "Peter", lastName: "Jones" },
  ],
};
app.get("/api/zadanie_03", (req, res) => {
  try {
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
app.put("/api/zadanie_03/:id", (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required." });
    }

    if (data.users[userId]) {
      data.users[userId].firstName = firstName;
      data.users[userId].lastName = lastName;
      return res
        .status(200)
        .json({ message: "User data updated successfully." });
    } else {
      return res.status(404).json({ message: "User not found." });
    }
  } catch (error) {
    console.log(error);
  }
});
app.delete("/api/zadanie_03/:id", (req, res) => {
  const userId = req.params.id;

  if (data.users[userId]) {
    data.users.splice(userId, 1);
    return res.status(200).json({ message: "User deleted successfully." });
  } else {
    return res.status(404).json({ message: "User not found." });
  }
});
app.post("/api/zadanie_03/", (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    if (!firstName || !lastName) {
      return res
        .status(400)
        .json({ message: "First name and last name are required." });
    }

    const newUser = { firstName, lastName };
    data.users.push(newUser);

    return res
      .status(200)
      .json({ message: "User added successfully.", newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error." });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
