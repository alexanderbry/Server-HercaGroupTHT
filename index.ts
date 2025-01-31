import express from "express";
import db from "./models/index";

require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

db.sequelize.sync.then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
