const express = require("express");
const cors=require("cors")
const mysql2 = require("mysql2");
const app = express();
const port = 5000;
const connection = mysql2.createConnection({
  host: "127.0.0.1",
  database: "test",
  user: "root",
  password: "",
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
  } else {
    console.log('Connected to MySQL database!');
  }
});


app.use(cors())
app.use(express.json({}));

app.get("/user", (req, res, next) => {
  const query = `SELECT * FROM USERS`;
  connection.execute(query, (err, result, fields) => {
    if (err) {
      return res.json({ messege: "query error", err });
    }
    return res.json({ messege: "done", result });
  });
});

app.post("/user", (req, res, next) => {
  const { email, password, name } = req.body;
  
  const query = `insert into users (name,email,password) values('${name}','${email}','${password}')`;
  connection.execute(query, (err, result, fields) => {
    if (err) {
      if (err.errno == 1062) {
        return res.json({ message: "email already exist", err });
      }
      return res.json({ messege: "query error", err });
    }
    return res.json({ messege: "done", result });
  });
});
app.get("/",(req, res, next) => {
  return res.json({ messege: "not found", result });
})

app.listen(port, () => {
  console.log(`server is running on port.....${port}`);
});
