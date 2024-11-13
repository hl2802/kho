module.exports = (sequelize, Sequelize) => {
    const TonKho = sequelize.define("ton_kho", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hang_Hoa_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hang_hoa', // Tên bảng khóa ngoại
          key: 'ID',        // Tên cột khóa ngoại
        }
      },
      kho_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'kho', // Tên bảng khóa ngoại
          key: 'ID',    // Tên cột khóa ngoại
        }
      },
      so_Luong: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      nSX_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nha_san_xuat', // Tên bảng khóa ngoại
          key: 'ID',            // Tên cột khóa ngoại
        }
      },
      tong_Gia_Tri_PN: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      tong_Gia_Tri_PX: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      danh_muc_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'danh_muc', // Tên bảng khóa ngoại
          key: 'ID',        // Tên cột khóa ngoại
        }
      },
    }, {
      timestamps: false,
      tableName: "ton_kho",
    });
  
    return TonKho;
  };
  