const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.listen(3333);
