const cookieSession = require("cookie-session");
const express = require("express");
const passport = require("passport");
const passportSetup = require("./controllers/passport");
const authRoute = require("./routes/auth.route");
const cors = require("cors");
const bodyParser = require("body-parser");
const authData = require("./routes/auth.route");
const projectData = require("./routes/project.route");
const Connect = require("./config/database");
const app = express();

app.use(
  cookieSession({
    name: "timecamp",
    keys: ["key_timecamp-1"],
    maxAge: 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "https://timecamp1clone.netlify.app",
    methods: "GET,POST,PUT,PATCH,DELETE",
    credentials: true,
  })
);
app.use("/auth", authRoute);
app.use('/')
const PORT=process.env.PORT||8080;
app.listen(PORT, async() => {
  await Connect();
  console.log(`Server is running at port ${PORT}`);
});
