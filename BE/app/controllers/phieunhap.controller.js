const db = require("../models");
const PhieuNhap = db.phieunhap;
const { Op } = db.Sequelize;

// Lấy tất cả phiếu nhập
exports.findAll = async (req, res) => {
  try {
    const phieuNhaps = await PhieuNhap.findAll();
    res.status(200).send(phieuNhaps);
  } catch (error) {
    console.error("Lỗi trong quá trình lấy tất cả phiếu nhập:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình lấy tất cả phiếu nhập." });
  }
};

// Lấy phiếu nhập theo ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const phieuNhap = await PhieuNhap.findByPk(id);
    if (phieuNhap) {
      res.status(200).send(phieuNhap);
    } else {
      res.status(404).send({ message: `Không tìm thấy phiếu nhập với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình lấy phiếu nhập theo ID:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình lấy phiếu nhập." });
  }
};

// Thêm mới phiếu nhập
exports.create = async (req, res) => {
  try {
    const { ma_Phieu, ten_Nhap, nha_Cung_Cap_Id, kho_Id, nhan_Vien_Id, tong_Gia_Tri, ngay_Nhap, hang_hoa_Id, danh_muc_Id, so_Luong } = req.body;

    if (!ma_Phieu || !ten_Nhap) {
      return res.status(400).send({ message: "Mã phiếu và tên nhập là bắt buộc." });
    }

    const newPhieuNhap = { ma_Phieu, ten_Nhap, nha_Cung_Cap_Id, kho_Id, nhan_Vien_Id, tong_Gia_Tri, ngay_Nhap, hang_hoa_Id, danh_muc_Id, so_Luong };
    const phieuNhap = await PhieuNhap.create(newPhieuNhap);
    res.status(201).send({ message: "Thêm phiếu nhập thành công.", data: phieuNhap });
  } catch (error) {
    console.error("Lỗi trong quá trình thêm phiếu nhập:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình thêm phiếu nhập." });
  }
};

// Sửa phiếu nhập đã có
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const { ma_Phieu, ten_Nhap, nha_Cung_Cap_Id, kho_Id, nhan_Vien_Id, tong_Gia_Tri, ngay_Nhap, hang_hoa_Id, danh_muc_Id, so_Luong } = req.body;

    const [updated] = await PhieuNhap.update(
      { ma_Phieu, ten_Nhap, nha_Cung_Cap_Id, kho_Id, nhan_Vien_Id, tong_Gia_Tri, ngay_Nhap, hang_hoa_Id, danh_muc_Id, so_Luong },
      { where: { ID: id } }
    );

    if (updated) {
      res.status(200).send({ message: "Cập nhật phiếu nhập thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy phiếu nhập với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật phiếu nhập:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình cập nhật phiếu nhập." });
  }
};

// Xóa phiếu nhập
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await PhieuNhap.destroy({ where: { ID: id } });
    if (deleted) {
      res.status(200).send({ message: "Xóa phiếu nhập thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy phiếu nhập với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình xóa phiếu nhập:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình xóa phiếu nhập." });
  }
};
