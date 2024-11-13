// module.exports = (sequelize, Sequelize) => {
//     const BaoCao = sequelize.define(
//       "bao_cao",
//       {
//         ID: {
//           type: Sequelize.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//         },
//         ma_Bao_Cao: {
//           type: Sequelize.STRING(255),
//           allowNull: false,
//         },
//         ngay_Bao_Cao: {
//           type: Sequelize.DATE,
//           allowNull: false,
//         },
//         loai_Bao_Cao: {
//           type: Sequelize.STRING(255),
//         },
//         nSX_Id: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           references: {
//             model: "nha_san_xuat", // Tên bảng nhà sản xuất
//             key: "ID",
//           },
//         },
//         nhan_Vien_Id: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           references: {
//             model: "nhan_vien", // Tên bảng nhân viên
//             key: "ID",
//           },
//         },
//         danh_Muc_Id: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           references: {
//             model: "danh_muc", // Tên bảng danh mục
//             key: "ID",
//           },
//         },
//       },
//       {
//         timestamps: false, 
//         tableName: "bao_cao", 
//       }
//     );
  
//     return BaoCao;
//   };
  