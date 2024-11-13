const db = require("../models");
const HangHoa = db.hanghoa;
const { Op } = require("sequelize");

// Lấy tất cả hàng hóa
exports.findAll = async (req, res) => {
  try {
    const hanghoas = await HangHoa.findAll();
    res.status(200).json(hanghoas);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hàng hóa:", error);
    res.status(500).send({ message: "Có lỗi xảy ra khi lấy danh sách hàng hóa." });
  }
};

// Lấy hàng hóa theo danh mục
exports.findByCategory = async (req, res) => {
  const { id } = req.params; // Lấy ID danh mục từ tham số

  try {
    // Tìm hàng hóa theo danh mục
    const data = await HangHoa.findAll({
      where: {
        danh_Muc_Id: id // Điều kiện tìm kiếm theo danh mục
      }
    });

    // Kiểm tra xem có dữ liệu hay không
    if (data.length === 0) {
      return res.status(404).send({ message: "Không tìm thấy hàng hóa nào trong danh mục này." });
    }

    res.status(200).send(data);
  } catch (error) {
    console.error("Lỗi trong quá trình tìm hàng hóa theo danh mục:", error);
    res.status(500).send({ message: "Có lỗi xảy ra khi tìm hàng hóa theo danh mục." });
  }
};

// Tìm hàng hóa theo tên
exports.findByName = async (req, res) => {
  const { tenHang } = req.params;

  try {
    const hanghoas = await HangHoa.findAll({
      where: {
        ten_Hang: {
          [db.Sequelize.Op.like]: `%${tenHang}%` // Tìm kiếm theo tên hàng
        }
      }
    });

    if (hanghoas.length === 0) {
      return res.status(404).send({ message: "Không tìm thấy hàng hóa với tên này." });
    }
    res.status(200).send(hanghoas);
  } catch (error) {
    console.error("Lỗi khi tìm hàng hóa theo tên:", error);
    res.status(500).send({ message: "Có lỗi xảy ra khi tìm hàng hóa." });
  }
};

// Thêm mới hàng hóa
exports.create = async (req, res) => {
  try {
    const {
      ma_Hang,
      ten_Hang,
      danh_Muc_Id,
      nSX_Id,
      so_Luong,
      gia_Ban,
      mo_Ta,
    } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ma_Hang || !ten_Hang || !gia_Ban || !so_Luong || !danh_Muc_Id) {
      return res
        .status(400)
        .send({ message: "Tất cả các trường đều cần thiết." });
    }

    // Kiểm tra xem ma_Hang đã tồn tại chưa
    const existingHangHoa = await HangHoa.findOne({ where: { ma_Hang } });
    if (existingHangHoa) {
      return res.status(400).send({ message: "Mã hàng đã tồn tại." });
    }

    // Tạo mới hàng hóa
    const newHangHoa = {
      ma_Hang,
      ten_Hang,
      mo_Ta,
      gia_Ban,
      so_Luong,
      nSX_Id,
      danh_Muc_Id, // Thêm danh_Muc_Id
    };

    const data = await HangHoa.create(newHangHoa);
    res.status(201).send({ message: "Thêm hàng hóa thành công.", data });
  } catch (error) {
    console.error("Lỗi trong quá trình thêm hàng hóa:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình thêm hàng hóa." });
  }
};

// Sửa hàng hóa
exports.update = async (req, res) => {
  try {
    const { id } = req.params; // Lấy ID từ tham số
    const { ma_Hang, ten_Hang, danh_Muc_Id, so_Luong, gia_Ban, mo_Ta } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ma_Hang || !ten_Hang || !gia_Ban || !so_Luong || !danh_Muc_Id) {
      return res.status(400).send({ message: "Tất cả các trường đều cần thiết." });
    }

    // Cập nhật hàng hóa
    const updatedHangHoa = {
      ma_Hang,
      ten_Hang,
      mo_Ta,
      gia_Ban,
      so_Luong,
      danh_Muc_Id, // Cập nhật danh_Muc_Id
    };

    const [updated] = await HangHoa.update(updatedHangHoa, {
      where: { ID: id }
    });

    if (updated) {
      const updatedData = await HangHoa.findByPk(id);
      res.status(200).send({ message: "Cập nhật hàng hóa thành công.", data: updatedData });
    } else {
      res.status(404).send({ message: "Hàng hóa không tồn tại." });
    }
  } catch (error) {
    console.error("Lỗi trong quá trình sửa hàng hóa:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình sửa hàng hóa." });
  }
};

// Xóa hàng hóa
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await HangHoa.destroy({
      where: { ID: id }
    });

    if (deleted) {
      res.status(200).send({ message: "Hàng hóa đã được xóa thành công." });
    } else {
      res.status(404).send({ message: "Không tìm thấy hàng hóa để xóa." });
    }
  } catch (error) {
    console.error("Lỗi khi xóa hàng hóa:", error);
    res.status(500).send({ message: "Có lỗi xảy ra khi xóa hàng hóa." });
  }
};
