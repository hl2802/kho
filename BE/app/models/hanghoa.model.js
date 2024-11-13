module.exports = (sequelize, Sequelize) => {
    const HangHoa = sequelize.define("hang_hoa", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ma_Hang: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ten_Hang: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      mo_Ta: {
        type: Sequelize.TEXT,
      },
      gia_Ban: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      so_Luong: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nSX_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "nha_san_xuat",
          key: "ID",
        },
      },
      danh_Muc_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "danh_muc",
          key: "ID",
        },
      },
    }, {
      timestamps: false,
      tableName: "hang_hoa",
    });
  
    return HangHoa;
  };
  