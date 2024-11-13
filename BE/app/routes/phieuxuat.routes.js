module.exports = app => {
    const phieuXuat = require("../controllers/phieuxuat.controller.js");
    const routerPhieuXuat = require("express").Router();

    // Thêm phiếu xuất mới
    routerPhieuXuat.post("/", phieuXuat.create);

    // Sửa phiếu xuất theo ID
    routerPhieuXuat.put("/:id", phieuXuat.update);

    // Xóa phiếu xuất theo ID
    routerPhieuXuat.delete("/:id", phieuXuat.delete);

    // Lấy tất cả phiếu xuất
    routerPhieuXuat.get("/", phieuXuat.findAll);

    // Lấy phiếu xuất theo ID
    routerPhieuXuat.get("/:id", phieuXuat.findOne);

    // Thêm router vào app
    app.use("/phieuxuat", routerPhieuXuat);
};
