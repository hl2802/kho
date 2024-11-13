module.exports = (app) => {
    const tonKho = require("../controllers/tonkho.controller.js");
  
    const router = require("express").Router();
  
    // Lấy tất cả tồn kho
    router.get("/", tonKho.findAll);
  
    // Tìm tồn kho theo mã hàng hóa hoặc tên hàng hóa
    router.get("/hanghoa/:ma_hang_hoa_or_ten", tonKho.findByMaHangHoaOrTenHangHoa);
  
    // Liệt kê tồn kho theo kho ID
    router.get("/kho/:kho_Id", tonKho.findByKhoId);
  
    // Liệt kê tồn kho theo danh mục ID
    router.get("/danhmuc/:danh_muc_Id", tonKho.findByDanhMucId);
  
    // Liệt kê tồn kho theo nhà sản xuất ID
    router.get("/nsx/:nSX_Id", tonKho.findByNSX);
  
    // Cập nhật tồn kho theo ID
    router.put("/:id", tonKho.update);
  
    // Xóa tồn kho theo ID
    router.delete("/:id", tonKho.delete);
  
    // Thêm routes vào app
    app.use("/tonkho", router); // Base route cho tồn kho
  };
  