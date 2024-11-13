const db = require("../models");
const Kho = db.kho;
const PhieuNhap = db.phieunhap;
const PhieuXuat = db.phieuxuat;

// Lấy tất cả kho
exports.findAll = async (req, res) => {
  try {
    const khoList = await Kho.findAll();
    res.status(200).send(khoList);
  } catch (error) {
    console.error("Lỗi khi lấy tất cả kho:", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình lấy tất cả kho.",
    });
  }
};

// Lấy kho theo ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const kho = await Kho.findByPk(id);
    if (kho) {
      res.status(200).send(kho);
    } else {
      res.status(404).send({
        message: `Không tìm thấy kho với ID=${id}.`,
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy kho theo ID:", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình lấy kho theo ID.",
    });
  }
};

// Lấy tất cả phiếu nhập theo kho_Id
exports.findPhieuNhapByKhoId = async (req, res) => {
  const kho_Id = req.params.kho_Id;
  try {
    const phieuNhaps = await PhieuNhap.findAll({
      where: { kho_Id },
    });

    if (phieuNhaps.length > 0) {
      res.status(200).send(phieuNhaps);
    } else {
      res.status(404).send({
        message: `Không tìm thấy phiếu nhập nào trong kho với ID=${kho_Id}.`,
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy phiếu nhập theo kho_Id:", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình lấy phiếu nhập.",
    });
  }
};

// Lấy tất cả phiếu xuất theo kho_Id
exports.findPhieuXuatByKhoId = async (req, res) => {
  const kho_Id = req.params.kho_Id;
  try {
    const phieuXuats = await PhieuXuat.findAll({
      where: { kho_Id },
    });

    if (phieuXuats.length > 0) {
      res.status(200).send(phieuXuats);
    } else {
      res.status(404).send({
        message: `Không tìm thấy phiếu xuất nào trong kho với ID=${kho_Id}.`,
      });
    }
  } catch (error) {
    console.error("Lỗi khi lấy phiếu xuất theo kho_Id:", error);
    res.status(500).send({
      message: "Có lỗi xảy ra trong quá trình lấy phiếu xuất.",
    });
  }
};
