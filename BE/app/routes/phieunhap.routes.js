module.exports = app => {
    const phieuNhap = require("../controllers/phieunhap.controller.js");
    const routerPhieuNhap = require("express").Router();

    // Thêm phiếu nhập mới
    routerPhieuNhap.post("/", phieuNhap.create);

    // Sửa phiếu nhập theo ID
    routerPhieuNhap.put("/:id", phieuNhap.update);

    // Xóa phiếu nhập theo ID
    routerPhieuNhap.delete("/:id", phieuNhap.delete);

    // Lấy tất cả phiếu nhập
    routerPhieuNhap.get("/", phieuNhap.findAll);

    // Lấy phiếu nhập theo ID
    routerPhieuNhap.get("/:id", phieuNhap.findOne);

    // Thêm router vào app
    app.use("/phieunhap", routerPhieuNhap);
};
