module.exports = (sequelize, Sequelize) => {
    const NhaCungCap = sequelize.define("nha_cung_cap", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ma_NCC: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ten_NCC: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      so_Dien_Thoai: {
        type: Sequelize.STRING(20),
      },
      dia_Chi: {
        type: Sequelize.STRING(255),
      },
    }, {
      timestamps: false,
      tableName: "nha_cung_cap",
    });
  
    return NhaCungCap;
  };
  