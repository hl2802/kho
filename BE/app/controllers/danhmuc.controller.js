const db = require("../models");
const DanhMuc = db.danhmuc;

// Lấy tất cả danh mục
exports.findAll = async (req, res) => {
  try {
    const danhMucs = await DanhMuc.findAll();
    res.status(200).send(danhMucs);
  } catch (error) {
    console.error("Lỗi trong quá trình lấy tất cả danh mục:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình lấy tất cả danh mục." });
  }
};

// Lấy danh mục theo ID
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const danhMuc = await DanhMuc.findByPk(id);
    if (danhMuc) {
      res.status(200).send(danhMuc);
    } else {
      res.status(404).send({ message: `Không tìm thấy danh mục với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình lấy danh mục theo ID:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình lấy danh mục." });
  }
};

// Thêm mới danh mục
exports.create = async (req, res) => {
  try {
    const { ten_Danh_Muc } = req.body;

    if (!ten_Danh_Muc) {
      return res.status(400).send({ message: "Tên danh mục là bắt buộc." });
    }

    const newDanhMuc = { ten_Danh_Muc };
    const danhMuc = await DanhMuc.create(newDanhMuc);
    res.status(201).send({ message: "Thêm danh mục thành công.", data: danhMuc });
  } catch (error) {
    console.error("Lỗi trong quá trình thêm danh mục:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình thêm danh mục." });
  }
};

// Sửa danh mục đã có
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const { ten_Danh_Muc } = req.body;

    const [updated] = await DanhMuc.update({ ten_Danh_Muc }, { where: { ID: id } });
    if (updated) {
      res.status(200).send({ message: "Cập nhật danh mục thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy danh mục với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình cập nhật danh mục:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình cập nhật danh mục." });
  }
};

// Xóa danh mục
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deleted = await DanhMuc.destroy({ where: { ID: id } });
    if (deleted) {
      res.status(200).send({ message: "Xóa danh mục thành công." });
    } else {
      res.status(404).send({ message: `Không tìm thấy danh mục với ID=${id}.` });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình xóa danh mục:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình xóa danh mục." });
  }
};

// Tìm danh mục theo tên
exports.findByName = async (req, res) => {
    try {
      const { ten_Danh_Muc } = req.params;
  
      // Tìm danh mục với tên tương ứng
      const danhMucs = await DanhMuc.findAll({
        where: {
          ten_Danh_Muc: {
            [db.Sequelize.Op.like]: `%${ten_Danh_Muc}%` // Tìm theo tên giống với chuỗi nhập
          }
        }
      });
  
      if (danhMucs.length > 0) {
        res.status(200).send(danhMucs);
      } else {
        res.status(404).send({ message: `Không tìm thấy danh mục với tên: ${ten_Danh_Muc}.` });
      }
    } catch (error) {
      console.error("Lỗi trong quá trình tìm danh mục theo tên:", error);
      res.status(500).send({ message: "Có lỗi xảy ra trong quá trình tìm danh mục theo tên." });
    }
  };
