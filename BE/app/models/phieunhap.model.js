module.exports = (sequelize, Sequelize) => {
    const PhieuNhap = sequelize.define("phieu_nhap", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ma_Phieu: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      ten_Nhap: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nha_Cung_Cap_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nha_cung_cap', // Tên bảng khóa ngoại
          key: 'ID',             // Tên cột khóa ngoại
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
      nhan_Vien_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'nhan_vien', // Tên bảng khóa ngoại
          key: 'ID',          // Tên cột khóa ngoại
        }
      },
      tong_Gia_Tri: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      ngay_Nhap: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      hang_hoa_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'hang_hoa', // Tên bảng khóa ngoại
          key: 'ID',        // Tên cột khóa ngoại
        }
      },
      danh_muc_Id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'danh_muc', // Tên bảng khóa ngoại
          key: 'ID',        // Tên cột khóa ngoại
        }
      },
      so_Luong: { 
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
    }, {
      timestamps: false,
      tableName: "phieu_nhap",
    });
  
    return PhieuNhap;
  };
  