module.exports = app => {
    const danhMuc = require("../controllers/danhmuc.controller.js");
  
    var router = require("express").Router();
  
    // Tạo mới danh mục
    router.post("/", danhMuc.create);
  
    // Lấy tất cả danh mục
    router.get("/", danhMuc.findAll);
  
    // Tìm danh mục theo tên
    router.get("/search/:ten_Danh_Muc", danhMuc.findByName);

    // Lấy một danh mục theo ID
    router.get("/:id", danhMuc.findOne);
  
    // Sửa danh mục theo ID
    router.put("/:id", danhMuc.update);
  
    // Xóa danh mục theo ID
    router.delete("/:id", danhMuc.delete);
  
    app.use("/danhmuc", router); // Thiết lập base route cho danh mục
};
