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
// Get All Info
app.get("/api/data", async (req, res) => {
  try {
    const lists = await con("lists").select("*");
    const tasks = await con("tasks").select("*");
    res.json({ lists: lists, tasks: tasks });
  } catch (error) {
    console.log(error);
  }
});

// Post Task
app.post("/api/data/task", async (req, res) => {
  try {
    console.log(req.body);
    const {
      task: { value, priority, image },
      id_list,
    } = req.body;

    const list = await con("lists").select().where({ id: id_list });
    if (list.length === 0) {
      return res.status(404).json({ error: "List not found" });
    }

    await con("tasks").insert({
      id_list: id_list,
      value: value,
      image: image,
      priority: priority,
    });

    const task = await con("tasks").select().where({ id: id_list });
    res.json({ message: "Inserted", task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});
//Update Task
app.post("/api/data/task/update", async (req, res) => {
  try {
    const { id_task, type, value } = req.body;
    console.log(req.body);

    if (!type) {
      const res = await con("tasks")
        .where("id", "=", id_task)
        .update({ priority: value });
    } else {
      const res = await con("tasks")
        .where("id", "=", id_task)
        .update({ value: value });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Post List
app.post("/api/data/list", async (req, res) => {
  try {
    const { name } = req.body;
    await con("lists").insert({ name });
    res.json({ message: "Inserted: " + name });
  } catch (error) {
    console.log(error);
  }
});

app.listen(12000, () => {
  console.log("Run");
});
