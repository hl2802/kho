// module.exports = (sequelize, Sequelize) => {
//     const ChiTietBaoCao = sequelize.define(
//       "chi_tiet_bao_cao",
//       {
//         ID: {
//           type: Sequelize.INTEGER,
//           autoIncrement: true,
//           primaryKey: true,
//         },
//         bao_Cao_Id: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           references: {
//             model: "bao_cao", // Tên bảng báo cáo
//             key: "ID",
//           },
//         },
//         hang_Hoa_Id: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//           references: {
//             model: "hang_hoa", // Tên bảng hàng hóa
//             key: "ID",
//           },
//         },
//         so_Luong: {
//           type: Sequelize.INTEGER,
//           allowNull: false,
//         },
//         gia_Tri: {
//           type: Sequelize.DECIMAL(15, 2),
//           allowNull: false,
//         },
//       },
//       {
//         timestamps: false, 
//         tableName: "chi_tiet_bao_cao", 
//       }
//     );
  
//     return ChiTietBaoCao;
//   };
  