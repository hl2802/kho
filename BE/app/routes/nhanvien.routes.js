module.exports = app => {
  const nhanVien = require("../controllers/nhanvien.controller.js");

  var router = require("express").Router();

  // Đăng ký nhân viên
  router.post("/signup", nhanVien.signup);

  // Đăng nhập
  router.post("/signin", nhanVien.signin);

  // Lấy danh sách nhân viên
  router.get('/employees', nhanVien.getAllEmployees);

  // Thiết lập base route cho các nhân viên
  app.use("/api/nhanvien", router); // Thiết lập prefix "api/nhanvien" cho các route
};
