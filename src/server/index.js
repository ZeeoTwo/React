const express = require("express");
const knex = require("knex");
const cors = require("cors");

const app = express();
app.use(express.json({ limit: "50mb" }));

const con = knex({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "",
    database: "todolist",
  },
});

const corsOptions = {
  origin: true,
  methods: ["GET", "POST"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.get("/api/data", async (req, res) => {
  try {
    const data = await con("images").select("*");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/data", async (req, res) => {
  try {
    console.log(req);
    const { id, image } = req.body;
    await con("images").insert({ id, image });
    res.json({ message: "Inserted" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(12000, () => {
  console.log("Run");
});
