const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middlewares/error");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};

// const _dirname = path.dirname("");
// const buildPath = path.join(_dirname, "../client/build");

// app.use(express.static(buildPath));

// app.get("*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname, "../client/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileupload());

const user = require("./routes/userRoute");
const channel = require("./routes/channelRoute");
// const milestone = require("./routes/milestoneRoute");
// const project = require("./routes/projectRoute");
// const standUp = require("./routes/standUpRoute");
const timeline = require("./routes/timelineRoute");
// const task = require("./routes/taskRoute");

app.use("/api/v1", user);
app.use("/api/v1", channel);
app.use("/api/v1", timeline);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
