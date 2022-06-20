require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const cors = require("cors");
const exercisesRouter = require("./routes/exercises.js");
const usersRouter = require("./routes/users.js");

// app config
const app = express();
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
// middleware
app.use(express.json());
app.use(cors());
// db connection
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch(() =>
    console.log("DB !connected. Please Check your Internet connection")
  );

// routes
app.get('/',(req,res)=>{
  res.json({status:"OK"})
})
app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
// listen
app.listen(port, () =>
  console.log(
    "listening on port " + port,
    "| open in browser at http://localhost:" + port
  )
);
