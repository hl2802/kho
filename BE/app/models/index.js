const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nhanvien = require("./nhanvien.model.js")(sequelize, Sequelize);
db.danhmuc = require("./danhmuc.model.js")(sequelize, Sequelize);
// db.baocao = require("./baocao.model.js")(sequelize, Sequelize);
// db.chitietbaocao = require("./chitietbaocao.model.js")(sequelize, Sequelize);
db.hanghoa = require("./hanghoa.model.js")(sequelize, Sequelize);
db.kho = require("./kho.model.js")(sequelize, Sequelize);
db.nhacungcap = require("./nhacungcap.model.js")(sequelize, Sequelize);
db.nhasanxuat = require("./nhasanxuat.model.js")(sequelize, Sequelize);
db.phieunhap = require("./phieunhap.model.js")(sequelize, Sequelize);
db.phieuxuat = require("./phieuxuat.model.js")(sequelize, Sequelize);
db.tonkho = require("./tonkho.model.js")(sequelize, Sequelize);

module.exports = db;