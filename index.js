import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "todolist",
  password: "johnpatrick022205",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

async function getTodoList() {
  const result = await db.query("SELECT * FROM items ORDER BY id ASC;");
  let todolist = [];
  result.rows.forEach((list) => {
    todolist.push(list);
  });
  return todolist;
}

async function insertTodoList(item) {
  await db.query("INSERT INTO items (title) VALUES ($1);", [item]);
}

async function updateTodoList(title, id) {
  await db.query("UPDATE items set title = ($1) WHERE id = ($2);", [title, id]);
}

async function deleteTodoList(id) {
  await db.query("DELETE FROM items WHERE id = ($1)", [id]);
}

app.get("/", async (req, res) => {
  try {
    const lists = await getTodoList();
    res.render("index.ejs", {
      listTitle: "Today",
      listItems: lists,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    if (item.trim().length === 0) {
      return res
        .status(400)
        .send("<h1>The title of the TodoList can't be empty!</h1>");
    } else {
      await insertTodoList(item);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const title = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;

  try {
    if (title.trim().length === 0) {
      return res
        .status(400)
        .send("<h1>The title of the TodoList can't be empty!</h1>");
    } else {
      await updateTodoList(title, id);
      res.redirect("/");
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await deleteTodoList(id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
