module.exports = (sequelize, Sequelize) => {
    const DanhMuc = sequelize.define(
      "danh_muc",
      {
        ID: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ten_Danh_Muc: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        timestamps: false, 
        tableName: "danh_muc", 
      }
    );
  
    return DanhMuc;
  };
  