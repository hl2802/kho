module.exports = app => {
  const dashboard = require("../controllers/dashboard.controller.js");
  const router = require("express").Router();

  //Tính tổng `tong_Gia_Tri` của phiếu nhập theo kho_Id
  router.get(
    "/phieunhap/tong_gia_tri/:kho_Id",
    dashboard.getTotalTongGiaTriByKhoIdNhap
  );

  //Tính tổng `so_Luong` của phiếu nhập theo kho_Id
  router.get(
    "/phieunhap/so_luong/:kho_Id",
    dashboard.getTotalSoLuongByKhoIdNhap
  );

  //Tính số lượng phiếu nhập theo kho_Id
  router.get(
    "/phieunhap/phieu_count/:kho_Id",
    dashboard.getPhieuNhapCountByKhoId
  );

  //Tính tổng `tong_Gia_Tri` của phiếu xuất theo kho_Id
  router.get(
    "/phieuxuat/tong_gia_tri/:kho_Id",
    dashboard.getTotalTongGiaTriByKhoIdXuat
  );

  //Tính tổng `so_Luong` của phiếu xuất theo kho_Id
  router.get(
    "/phieuxuat/so_luong/:kho_Id",
    dashboard.getTotalSoLuongByKhoIdXuat
  );

  //Tính số lượng phiếu xuất theo kho_Id
  router.get(
    "/phieuxuat/phieu_count/:kho_Id",
    dashboard.getPhieuXuatCountByKhoId
  );

  // Tính tổng `so_Luong` trong `tonkho` theo kho_Id
  router.get(
    "/tonkho/so_luong/:kho_Id",
    dashboard.getTotalSoLuongTonKhoByKhoId
  );

  // Tính tổng `tong_Gia_Tri_PN` trong `tonkho` theo kho_Id
  router.get(
    "/tonkho/tong_gia_tri_pn/:kho_Id",
    dashboard.getTotalTongGiaTriPNByKhoId
  );

  // Tính tổng số lượng `danhmuc` theo kho_Id
  router.get("/danhmuc/so_luong/", dashboard.getTotalDanhMuc);

  // Tính tổng số lượng `nhasanxuat` theo kho_Id
  router.get(
    "/nhasanxuat/so_luong/",
    dashboard.getTotalNhaSanXuat
  );

  // Tính tổng số lượng `hanghoa`
  router.get(
    "/hanghoa/so_luong/",
    dashboard.getTotalHangHoa
  );

  // Thêm router vào app
  app.use("/dashboard", router);
};
  