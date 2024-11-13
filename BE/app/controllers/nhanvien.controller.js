const db = require("../models");
const NhanVien = db.nhanvien; 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Hàm đăng ký (signup)
exports.signup = async (req, res) => {
  try {
    const { ma_NV, ho_Ten, chuc_Vu, dia_Chi, so_Dien_Thoai, mat_Khau } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ma_NV || !ho_Ten || !chuc_Vu || !dia_Chi || !so_Dien_Thoai || !mat_Khau) {
      return res.status(400).send({ message: "Tất cả các trường đều cần thiết." });
    }

    // Kiểm tra xem ma_NV đã tồn tại chưa
    const existingUser = await NhanVien.findOne({ where: { ma_NV } });
    if (existingUser) {
      return res.status(400).send({ message: "Mã nhân viên đã được đăng ký." });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(mat_Khau, 10);

    // Tạo mới nhân viên
    const newNhanVien = {
      ma_NV,
      ho_Ten,
      chuc_Vu,
      dia_Chi,
      so_Dien_Thoai,
      mat_Khau: hashedPassword
    };

    const data = await NhanVien.create(newNhanVien);
    res.status(201).send({ message: "Đăng ký thành công.", data });
  } catch (error) {
    console.error("Lỗi trong quá trình đăng ký:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình đăng ký." });
  }
};

// Hàm đăng nhập (signin)
exports.signin = async (req, res) => {
  try {
    const { ma_NV, mat_Khau } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ma_NV || !mat_Khau) {
      return res.status(400).send({ message: "Mã nhân viên và mật khẩu là bắt buộc." });
    }

    // Tìm nhân viên theo ma_NV
    const user = await NhanVien.findOne({ where: { ma_NV } });
    if (!user) {
      return res.status(404).send({ message: "Nhân viên không tồn tại." });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(mat_Khau, user.mat_Khau);
    if (!isMatch) {
      return res.status(401).send({ message: "Mật khẩu không chính xác." });
    }

    // Tạo token
    const token = jwt.sign({ id: user.ID }, "YOUR_SECRET_KEY", {
      expiresIn: "1h" // Thời gian hết hạn token
    });

    // Trả về thông tin nhân viên và token
    res.status(200).send({
      message: "Đăng nhập thành công.",
      token,
      user: {
        id: user.ID,
        ma_NV: user.ma_NV,
        ho_Ten: user.ho_Ten,
        chuc_Vu: user.chuc_Vu,
        dia_Chi: user.dia_Chi,
        so_Dien_Thoai: user.so_Dien_Thoai,
      }
    });
  } catch (error) {
    console.error("Lỗi trong quá trình đăng nhập:", error);
    res.status(500).send({ message: "Có lỗi xảy ra trong quá trình đăng nhập." });
  }
};
