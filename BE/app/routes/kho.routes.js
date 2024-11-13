module.exports = app => {
    const kho = require("../controllers/kho.controller.js");
    const router = require("express").Router();

    // Lấy tất cả kho
    router.get("/", kho.findAll);

    // Lấy một kho theo ID
    router.get("/:id", kho.findOne);

    // Lấy tất cả phiếu nhập theo kho_Id
    router.get("/:kho_Id/phieunhap", kho.findPhieuNhapByKhoId);

    // Lấy tất cả phiếu xuất theo kho_Id
    router.get("/:kho_Id/phieuxuat", kho.findPhieuXuatByKhoId);

    // Thêm router vào app
    app.use("/kho", router);
};
