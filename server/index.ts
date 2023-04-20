import express from "express";
import knex from "knex";

const app = express();
const con = knex({
  client: "mysql",
  connection: {
    host: "localjost",
    user: "root",
    password: "",
    database: "todolist",
  },
});

app.get("/api/data", async (req, res) => {
  try {
    const data = await con("images").select("*");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.listen(12000, () => {
  console.log("Run");
});
