module.exports = app => {
    const nhanVien = require("../controllers/nhanvien.controller.js");
  
    var router = require("express").Router();
  
    // Đăng ký nhân viên
    router.post("/signup", nhanVien.signup);
  
    // Đăng nhập
    router.post("/signin", nhanVien.signin);
  
    app.use("/nhanvien", router); // Thiết lập base route cho các nhân viên
  };
  