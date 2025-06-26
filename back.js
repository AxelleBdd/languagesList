const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const database = ["html", "css"];

app.use(cors());  
app.use(express.json());

app.get("/languages", (req, res) => {
  res.json(database);
});

app.post("/languages", (req, res) => {
  database.push(req.body.language);
  res.json(database);
});

app.put("/languages/:name", (req, res) => {
    const oldName = req.params.name;
    const newName = req.body.language;
    const index = database.indexOf(oldName);

    database[index] = newName;
    res.json(database);
});

app.delete("/languages", (req, res) => {
    const langageToDelete = req.body.language;
    const index = database.indexOf(langageToDelete);

    database.splice(index, 1);
    res.json(database)
})

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});