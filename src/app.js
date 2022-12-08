require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./db/connect");

const notFound = require("./middleware/not-found");

const app = express();

//middleware
app.use(express.json());
app.use(morgan("tiny"));

//not found middleware
app.use(notFound);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(`server did not start with error: ${err.message}`);
  }
};

//start the server
start();
