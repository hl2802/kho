module.exports = (sequelize, Sequelize) => {
  const NhanVien = sequelize.define(
    "nhan_vien",
    {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ma_NV: {
        type: Sequelize.STRING(255)
      },
      ho_Ten: {
        type: Sequelize.STRING(255)
      },
      chuc_Vu: {
        type: Sequelize.STRING(255)
      },
      so_Dien_Thoai: {
        type: Sequelize.STRING(20)
      },
      dia_Chi: {
        type: Sequelize.STRING(255)
      },
      mat_Khau: {
        type: Sequelize.STRING(255),
        allowNull: false
      }
    },
    {
      timestamps: false, // Tắt timestamps
      tableName: "nhan_vien", // Đặt tên bảng tùy chỉnh là "nhan_vien"
      freezeTableName: true    // Giữ nguyên tên bảng, không đổi sang số nhiều
    }
  );

  return NhanVien;
};
