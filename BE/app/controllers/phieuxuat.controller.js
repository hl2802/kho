const db = require("../models");
const PhieuXuat = db.phieuxuat;

// Lấy tất cả phiếu xuất
exports.findAll = async (req, res) => {
  try {
    const phieuXuats = await PhieuXuat.findAll();
    res.status(200).send(phieuXuats);
  } catch (error) {
    console.error("Lỗi trong quá trình lấy tất cả phiếu xuất:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình lấy tất cả phiếu xuất." });
  }
};

// Lấy phiếu xuất theo ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const phieuXuat = await PhieuXuat.findByPk(id);
    if (phieuXuat) {
      res.status(200).send(phieuXuat);
    } else {
      res.status(404).send({ message: `Không tìm thấy phiếu xuất với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình lấy phiếu xuất theo ID:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình lấy phiếu xuất." });
  }
};

// Thêm mới phiếu xuất
exports.create = async (req, res) => {
  try {
    const { ma_Phieu, ngay_Xuat, kho_Id, nhan_Vien_Id, tong_Gia_Tri, hang_Hoa_Id, danh_muc_Id } = req.body;

    if (!ma_Phieu || !ngay_Xuat) {
      return res.status(400).send({ message: "Mã phiếu và ngày xuất là bắt buộc." });
    }

    const newPhieuXuat = { ma_Phieu, ngay_Xuat, kho_Id, nhan_Vien_Id, tong_Gia_Tri, hang_Hoa_Id, danh_muc_Id };
    const phieuXuat = await PhieuXuat.create(newPhieuXuat);
    res.status(201).send({ message: "Thêm phiếu xuất thành công.", data: phieuXuat });
  } catch (error) {
    console.error("Lỗi trong quá trình thêm phiếu xuất:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình thêm phiếu xuất." });
  }
};

// Sửa phiếu xuất đã có
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const { ma_Phieu, ngay_Xuat, kho_Id, nhan_Vien_Id, tong_Gia_Tri, hang_Hoa_Id, danh_muc_Id } = req.body;

    const [updated] = await PhieuXuat.update(
      { ma_Phieu, ngay_Xuat, kho_Id, nhan_Vien_Id, tong_Gia_Tri, hang_Hoa_Id, danh_muc_Id },
      { where: { ID: id } }
    );

    if (updated) {
      res.status(200).send({ message: "Cập nhật phiếu xuất thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy phiếu xuất với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật phiếu xuất:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình cập nhật phiếu xuất." });
  }
};

// Xóa phiếu xuất
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await PhieuXuat.destroy({ where: { ID: id } });
    if (deleted) {
      res.status(200).send({ message: "Xóa phiếu xuất thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy phiếu xuất với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình xóa phiếu xuất:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình xóa phiếu xuất." });
  }
};

