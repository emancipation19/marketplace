import express, { application } from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "marketplace",
  port: "3306",
});

app.get("/", (req, res) => {
  res.json("Hello, this is the backend");
});

app.get("/merch", (req, res) => {
  const q = "SELECT * FROM merch";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.get("/merch/:id", (req, res) => {
  const q = "SELECT * FROM merch WHERE id=" + req.params.id;
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/merch", (req, res) => {
  const c =
    "INSERT INTO merch (`id`, `prod_name`, `prod_description`, `image`,`price`, `stocks` ) VALUES(?)";
  const values = [
    req.body.id,
    req.body.prod_name,
    req.body.prod_description,
    req.body.image,
    req.body.price,
    req.body.stocks,
  ];
  db.query(c, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("data is successfully executed!");
  });
});

app.delete("/merch/:id", (req, res) => {
  const merchId = req.params.id;
  const q = "DELETE FROM merch WHERE id = ?";

  db.query(q, [merchId], (err, data) => {
    if (err) return res.json(err);
    return res.json("data is successfully deleted!");
  });
});

app.put("/merch/:id", (req, res) => {
  const merch = req.params.id;

  let queries = [];

  for (const [key, value] of Object.entries(req.body)) {
    if (value) {
      queries.push(`\`${key}\`='${value}'`);
    }
  }

  let q = `UPDATE merch SET ${queries.join(",")} WHERE id=${req.params.id}`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("Item has been successfully updated");
  });
});

app.listen(8800, () => {
  console.log("connected to backend");
});
