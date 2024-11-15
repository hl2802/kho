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
      return res.status(400).json({ message: "Tất cả các trường đều cần thiết." });
    }

    // Kiểm tra xem ma_NV đã tồn tại chưa
    const existingUser = await NhanVien.findOne({ where: { ma_NV } });
    if (existingUser) {
      return res.status(400).json({ message: "Mã nhân viên đã được đăng ký." });
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
    return res.status(201).json({ message: "Đăng ký thành công.", data });
  } catch (error) {
    console.error("Lỗi trong quá trình đăng ký:", error.message);
    return res.status(500).json({ message: "Có lỗi xảy ra trong quá trình đăng ký." });
  }
};

// Hàm đăng nhập (signin)
exports.signin = async (req, res) => {
  try {
    const { ma_NV, mat_Khau } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!ma_NV || !mat_Khau) {
      return res.status(400).json({ message: "Mã nhân viên và mật khẩu là bắt buộc." });
    }

    // Tìm nhân viên theo ma_NV
    const user = await NhanVien.findOne({ where: { ma_NV } });
    if (!user) {
      return res.status(404).json({ message: "Nhân viên không tồn tại." });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(mat_Khau, user.mat_Khau);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác." });
    }

    // Tạo token
    const token = jwt.sign({ id: user.ID }, process.env.JWT_SECRET || "YOUR_SECRET_KEY", {
      expiresIn: "1h" // Thời gian hết hạn token
    });

    // Trả về thông tin nhân viên và token
    return res.status(200).json({
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
    console.error("Lỗi trong quá trình đăng nhập:", error.message);
    return res.status(500).json({ message: "Có lỗi xảy ra trong quá trình đăng nhập." });
  }
};

// Hàm lấy danh sách nhân viên
exports.getAllEmployees = async (req, res) => {
  try {
    // Lấy danh sách tất cả nhân viên từ cơ sở dữ liệu
    const employees = await NhanVien.findAll({
      attributes: ['ma_NV', 'ho_Ten', 'chuc_Vu', 'dia_Chi', 'so_Dien_Thoai'] // Chỉ lấy các trường cần thiết
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "Không có nhân viên nào." });
    }

    const employeeList = employees.map(employee => ({
      ma_NV: employee.ma_NV,
      ho_Ten: employee.ho_Ten,
      chuc_Vu: employee.chuc_Vu,
      dia_Chi: employee.dia_Chi,
      so_Dien_Thoai: employee.so_Dien_Thoai
    }));

    return res.status(200).json({
      message: "Lấy danh sách nhân viên thành công.",
      data: employeeList
    });
  } catch (error) {
    console.error("Lỗi trong quá trình lấy danh sách nhân viên:", error.message);
    return res.status(500).json({ message: "Có lỗi xảy ra trong quá trình lấy danh sách nhân viên." });
  }
};
