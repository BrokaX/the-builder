const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const mongoose = require('mongoose');
const userRouter = require("./routes/api/usersRouter");
const templateRouter = require("./routes/api/templateRouter");
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((error) => console.log(error));

app.use(passport.initialize());
require("./config/passport.js")(passport);

app.use("/api/users", userRouter);
app.use("/templates", templateRouter);
// test message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
