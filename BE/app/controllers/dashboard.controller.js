const db = require("../models");
const PhieuNhap = db.phieunhap;
const PhieuXuat = db.phieuxuat;
const TonKho = db.tonkho;
const DanhMuc = db.danhmuc;
const NhaSanXuat = db.nhasanxuat;
const HangHoa = db.hanghoa;

//Tính tổng `tong_Gia_Tri` của phiếu nhập theo `kho_Id`
exports.getTotalTongGiaTriByKhoIdNhap = async (req, res) => {
  const kho_Id = req.params.kho_Id;

  try {
    const result = await PhieuNhap.findAll({
      where: { kho_Id },
      attributes: [
        [db.Sequelize.fn("SUM", db.Sequelize.col("tong_Gia_Tri")), "totalTongGiaTri"]
      ]
    });

    const totalTongGiaTri = result[0].dataValues.totalTongGiaTri || 0;

    res.status(200).send({
      kho_Id,
      totalTongGiaTri
    });
  } catch (error) {
    console.error("Lỗi khi tính tổng `tong_Gia_Tri` theo kho_Id (phieu_nhap):", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính tổng `tong_Gia_Tri`."
    });
  }
};

//Tính tổng `so_Luong` của phiếu nhập theo `kho_Id`
exports.getTotalSoLuongByKhoIdNhap = async (req, res) => {
  const kho_Id = req.params.kho_Id;

  try {
    const result = await PhieuNhap.findAll({
      where: { kho_Id },
      attributes: [
        [db.Sequelize.fn("SUM", db.Sequelize.col("so_Luong")), "totalSoLuong"]
      ]
    });

    const totalSoLuong = result[0].dataValues.totalSoLuong || 0;

    res.status(200).send({
      kho_Id,
      totalSoLuong
    });
  } catch (error) {
    console.error("Lỗi khi tính tổng `so_Luong` theo kho_Id (phieu_nhap):", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính tổng `so_Luong`."
    });
  }
};

//Tính số lượng phiếu nhập theo `kho_Id`
exports.getPhieuNhapCountByKhoId = async (req, res) => {
  const kho_Id = req.params.kho_Id;

  try {
    const result = await PhieuNhap.findAll({
      where: { kho_Id },
      attributes: [
        [db.Sequelize.fn("COUNT", db.Sequelize.col("ID")), "phieuNhapCount"]
      ]
    });

    const phieuNhapCount = result[0].dataValues.phieuNhapCount || 0;

    res.status(200).send({
      kho_Id,
      phieuNhapCount
    });
  } catch (error) {
    console.error("Lỗi khi tính số lượng phiếu nhập theo kho_Id (phieu_nhap):", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính số lượng phiếu nhập."
    });
  }
};

//Tính tổng `tong_Gia_Tri` của phiếu xuất theo `kho_Id`
exports.getTotalTongGiaTriByKhoIdXuat = async (req, res) => {
  const kho_Id = req.params.kho_Id;

  try {
    const result = await PhieuXuat.findAll({
      where: { kho_Id },
      attributes: [
        [db.Sequelize.fn("SUM", db.Sequelize.col("tong_Gia_Tri")), "totalTongGiaTri"]
      ]
    });

    const totalTongGiaTri = result[0].dataValues.totalTongGiaTri || 0;

    res.status(200).send({
      kho_Id,
      totalTongGiaTri
    });
  } catch (error) {
    console.error("Lỗi khi tính tổng `tong_Gia_Tri` theo kho_Id (phieu_xuat):", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính tổng `tong_Gia_Tri`."
    });
  }
};

//Tính tổng `so_Luong` của phiếu xuất theo `kho_Id`
exports.getTotalSoLuongByKhoIdXuat = async (req, res) => {
  const kho_Id = req.params.kho_Id;

  try {
    const result = await PhieuXuat.findAll({
      where: { kho_Id },
      attributes: [
        [db.Sequelize.fn("SUM", db.Sequelize.col("so_Luong")), "totalSoLuong"]
      ]
    });

    const totalSoLuong = result[0].dataValues.totalSoLuong || 0;

    res.status(200).send({
      kho_Id,
      totalSoLuong
    });
  } catch (error) {
    console.error("Lỗi khi tính tổng `so_Luong` theo kho_Id (phieu_xuat):", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính tổng `so_Luong`."
    });
  }
};

//Tính số lượng phiếu xuất theo `kho_Id`
exports.getPhieuXuatCountByKhoId = async (req, res) => {
  const kho_Id = req.params.kho_Id;

  try {
    const result = await PhieuXuat.findAll({
      where: { kho_Id },
      attributes: [
        [db.Sequelize.fn("COUNT", db.Sequelize.col("ID")), "phieuXuatCount"]
      ]
    });

    const phieuXuatCount = result[0].dataValues.phieuXuatCount || 0;

    res.status(200).send({
      kho_Id,
      phieuXuatCount
    });
  } catch (error) {
    console.error("Lỗi khi tính số lượng phiếu xuất theo kho_Id (phieu_xuat):", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính số lượng phiếu xuất."
    });
  }
};

// Tính tổng `so_Luong` trong `tonkho` theo `kho_Id`
exports.getTotalSoLuongTonKhoByKhoId = async (req, res) => {
    const kho_Id = req.params.kho_Id;
  
    try {
      const result = await TonKho.findAll({
        where: { kho_Id },
        attributes: [
          [db.Sequelize.fn("SUM", db.Sequelize.col("so_Luong")), "totalSoLuong"]
        ]
      });
  
      const totalSoLuong = result[0].dataValues.totalSoLuong || 0;
  
      res.status(200).send({
        kho_Id,
        totalSoLuong
      });
    } catch (error) {
      console.error("Lỗi khi tính tổng `so_Luong` trong `tonkho` theo kho_Id:", error);
      res.status(500).send({
        message: "Có lỗi xảy ra trong quá trình tính tổng `so_Luong` trong `tonkho`."
      });
    }
  };
  
  // Tính tổng `tong_Gia_Tri_PN` trong `tonkho` theo `kho_Id`
  exports.getTotalTongGiaTriPNByKhoId = async (req, res) => {
    const kho_Id = req.params.kho_Id;
  
    try {
      const result = await TonKho.findAll({
        where: { kho_Id },
        attributes: [
          [db.Sequelize.fn("SUM", db.Sequelize.col("tong_Gia_Tri_PN")), "totalTongGiaTriPN"]
        ]
      });
  
      const totalTongGiaTriPN = result[0].dataValues.totalTongGiaTriPN || 0;
  
      res.status(200).send({
        kho_Id,
        totalTongGiaTriPN
      });
    } catch (error) {
      console.error("Lỗi khi tính tổng `tong_Gia_Tri_PN` trong `tonkho` theo kho_Id:", error);
      res.status(500).send({
        message: "Có lỗi xảy ra trong quá trình tính tổng `tong_Gia_Tri_PN` trong `tonkho`."
      });
    }
  };
  
// Tính tổng số lượng tất cả `danhmuc`
exports.getTotalDanhMuc = async (req, res) => {
  try {
    const result = await DanhMuc.findAll({
      attributes: [
        [db.Sequelize.fn("COUNT", db.Sequelize.col("ID")), "totalDanhMucCount"]
      ]
    });

    const totalDanhMucCount = result[0].dataValues.totalDanhMucCount || 0;

    res.status(200).send({
      totalDanhMucCount
    });
  } catch (error) {
    console.error("Lỗi khi tính tổng số lượng danh mục:", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính tổng số lượng danh mục."
    });
  }
};

// Tính tổng số lượng tất cả `nhasanxuat`
exports.getTotalNhaSanXuat = async (req, res) => {
  try {
    const result = await NhaSanXuat.findAll({
      attributes: [
        [db.Sequelize.fn("COUNT", db.Sequelize.col("ID")), "totalNhaSanXuatCount"]
      ]
    });

    const totalNhaSanXuatCount = result[0].dataValues.totalNhaSanXuatCount || 0;

    res.status(200).send({
      totalNhaSanXuatCount
    });
  } catch (error) {
    console.error("Lỗi khi tính tổng số lượng NSX:", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính tổng số lượng NSX."
    });
  }
};

// Tính tổng số lượng so_Luong của tất cả hàng hóa
exports.getTotalHangHoa = async (req, res) => {
  try {
    const result = await HangHoa.findAll({
      attributes: [
        [db.Sequelize.fn("SUM", db.Sequelize.col("so_Luong")), "totalSoLuong"]
      ]
    });

    const totalSoLuong = result[0].dataValues.totalSoLuong || 0;

    res.status(200).send({
      totalSoLuong
    });
  } catch (error) {
    console.error("Lỗi khi tính tổng số lượng `so_Luong` trong `HangHoa`:", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình tính tổng số lượng `so_Luong` trong `HangHoa`."
    });
  }
};


