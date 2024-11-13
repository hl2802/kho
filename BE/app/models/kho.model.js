module.exports = (sequelize, Sequelize) => {
    const Kho = sequelize.define("kho", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ma_Kho: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ton_Kho: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dia_Chi: {
        type: Sequelize.STRING(255),
      },
      danh_Muc_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "danh_muc", // Tên bảng danh mục
          key: "ID",
        },
      },
    }, {
      timestamps: false,
      tableName: "kho",
    });
  
    return Kho;
  };
  