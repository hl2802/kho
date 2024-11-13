const db = require("../models");
const TonKho = db.tonkho;
const HangHoa = db.hanghoa;
const { Op } = db.Sequelize;

// Lấy tất cả tồn kho
exports.findAll = async (req, res) => {
  try {
    const tonKhos = await TonKho.findAll();
    res.status(200).send(tonKhos);
  } catch (error) {
    console.error("Lỗi trong quá trình lấy tất cả tồn kho:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình lấy tất cả tồn kho." });
  }
};

// Tìm tồn kho theo mã hàng hóa hoặc tên hàng hóa
exports.findByMaHangHoaOrTenHangHoa = async (req, res) => {
  try {
    const { ma_hang_hoa, ten_Hang_Hoa } = req.params;

    const condition = ma_hang_hoa
      ? { "$HangHoa.ma_hang_hoa$": ma_hang_hoa }
      : { "$HangHoa.ten_Hang_Hoa$": { [Op.like]: `%${ten_Hang_Hoa}%` } };

    const tonKhos = await TonKho.findAll({
      include: [
        {
          model: HangHoa,
          as: "HangHoa", // Giả sử liên kết bảng có tên là "HangHoa"
          attributes: ["ma_hang_hoa", "ten_Hang_Hoa"],
          where: condition,
        },
      ],
    });

    if (tonKhos.length > 0) {
      res.status(200).send(tonKhos);
    } else {
      res.status(404).send({
        message: `Không tìm thấy tồn kho với mã hàng hóa hoặc tên hàng hóa: ${ma_hang_hoa || ten_Hang_Hoa}.`,
      });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình tìm tồn kho theo mã hàng hóa hoặc tên hàng hóa:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình tìm tồn kho." });
  }
};

// Liệt kê tồn kho theo kho_Id
exports.findByKhoId = async (req, res) => {
  const { kho_Id } = req.params;
  try {
    const tonKhos = await TonKho.findAll({ where: { kho_Id } });
    if (tonKhos.length > 0) {
      res.status(200).send(tonKhos);
    } else {
      res.status(404).send({ message: `Không tìm thấy tồn kho trong kho ID=${kho_Id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình liệt kê tồn kho theo kho ID:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình liệt kê tồn kho theo kho ID." });
  }
};

// Liệt kê tồn kho theo danh_Muc_Id
exports.findByDanhMucId = async (req, res) => {
  const { danh_muc_Id } = req.params;
  try {
    const tonKhos = await TonKho.findAll({ where: { danh_muc_Id } });
    if (tonKhos.length > 0) {
      res.status(200).send(tonKhos);
    } else {
      res.status(404).send({ message: `Không tìm thấy tồn kho với danh mục ID=${danh_muc_Id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình liệt kê tồn kho theo danh mục ID:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình liệt kê tồn kho theo danh mục ID." });
  }
};

// Liệt kê tồn kho theo nhà sản xuất
exports.findByNSX = async (req, res) => {
  const { nSX_Id } = req.params;
  try {
    const tonKhos = await TonKho.findAll({ where: { nSX_Id } });
    if (tonKhos.length > 0) {
      res.status(200).send(tonKhos);
    } else {
      res.status(404).send({ message: `Không tìm thấy tồn kho với nhà sản xuất ID=${nSX_Id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình liệt kê tồn kho theo nhà sản xuất:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình liệt kê tồn kho theo nhà sản xuất." });
  }
};

// Sửa thông tin tồn kho
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const { hang_Hoa_Id, kho_Id, so_Luong, nSX_Id, tong_Gia_Tri_PN, tong_Gia_Tri_PX, danh_muc_Id } = req.body;

    const [updated] = await TonKho.update(
      { hang_Hoa_Id, kho_Id, so_Luong, nSX_Id, tong_Gia_Tri_PN, tong_Gia_Tri_PX, danh_muc_Id },
      { where: { ID: id } }
    );

    if (updated) {
      res.status(200).send({ message: "Cập nhật tồn kho thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy tồn kho với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật tồn kho:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình cập nhật tồn kho." });
  }
};

// Xóa tồn kho
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await TonKho.destroy({ where: { ID: id } });
    if (deleted) {
      res.status(200).send({ message: "Xóa tồn kho thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy tồn kho với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình xóa tồn kho:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình xóa tồn kho." });
  }
};
