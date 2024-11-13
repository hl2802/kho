module.exports = (app) => {
  const hanghoaController = require("../controllers/hanghoa.controller.js");

  var router = require("express").Router();

  // Lấy tất cả hàng hóa
  router.get("/", hanghoaController.findAll);

  // Lấy hàng hóa theo danh mục
  router.get("/category/:id", hanghoaController.findByCategory);

  // Tìm hàng hóa theo tên
  router.get("/find/:tenHang", hanghoaController.findByName);

  // Thêm mới hàng hóa
  router.post("/", hanghoaController.create);

  // Sửa hàng hóa
  router.put("/:id", hanghoaController.update);

  // Xóa hàng hóa
  router.delete("/:id", hanghoaController.delete);

  app.use("/hanghoa", router);
};
