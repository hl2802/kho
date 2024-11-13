const express = require("express");
const cors = require('cors')

const app = express();

// Cho phép CORS từ mọi nguồn
app.use(cors())

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(express.json())


// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Quan's application." });
});

require("./app/routes/nhanvien.routes.js")(app);
require("./app/routes/hanghoa.routes.js")(app);
require("./app/routes/danhmuc.routes.js")(app);
require("./app/routes/nhasanxuat.routes.js")(app);
require("./app/routes/phieunhap.routes.js")(app);
require("./app/routes/phieuxuat.routes.js")(app);
require("./app/routes/kho.routes.js")(app);
require("./app/routes/tonkho.routes.js")(app);
require("./app/routes/dashboard.routes.js")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});