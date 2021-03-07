import express = require("express");
import cors = require("cors");
import session = require("express-session");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import "reflect-metadata";

import authRouter = require("./routes/auth");

const app = express();

app.set("port", process.env.PORT || 8080);
app.use(logger("combined"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["OPTIONS", "GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "process.env.COOKIE_SECRET",
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.listen(app.get("port"), () => {
  console.log('start server successfully');
});

