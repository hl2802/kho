module.exports = app => {
    const nhaSanXuat = require("../controllers/nhasanxuat.controller.js");
  
    const router = require("express").Router();
  
    // Thêm nhà sản xuất mới
    router.post("/", nhaSanXuat.create);
  
    // Sửa thông tin nhà sản xuất theo ID
    router.put("/:id", nhaSanXuat.update);
  
    // Xóa nhà sản xuất theo ID
    router.delete("/:id", nhaSanXuat.delete);
  
    // Tìm nhà sản xuất theo tên
    router.get("/search/:name", nhaSanXuat.findByName);

    // Tìm all nhà sản xuất 
    router.get("/", nhaSanXuat.findAll);

    // Tìm nhà sản xuất theo ID 
    router.get("/:id", nhaSanXuat.findOne);

    // Thêm router vào app
    app.use("/nhasanxuat", router); // Thiết lập base route cho nhà sản xuất
};
