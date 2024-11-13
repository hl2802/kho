import React, { useEffect, useState } from "react";
import "./css/Warehouse.css";
import { formatter } from "../components/fomater.jsx";
import Categories from "./Categories.jsx";
import Producer from "./Producer.jsx";
import axios from "axios";

const Warehouse = () => {
  const [warehouses, setWarehouse] = useState([]);
  const [categories, setCategories] = useState([]); // Danh mục
  const [producers, setProducers] = useState([]); // Nhà sản xuất
  const [newWarehouses, setNewWarehouses] = useState({
    hang_Hoa_Id: '',
    kho_Id: '',
    so_Luong: 0,
    nSX_Id: '',
    tong_Gia_Tri_PN: 0,
    tong_Gia_Tri_PX: 0,
    danh_Muc_Id: ''
  });
  const [showModalCategories, setShowModalCategories] = useState(false);
  const [showModalProducer, setShowModalProducer] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  // State mới cho filter tìm kiếm
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProducer, setSelectedProducer] = useState('');

  useEffect(() => {
    fetchWarehouse();
    fetchCategories();
    fetchProducers();
  }, []);

  useEffect(() => {
    if (!showModalEdit) {
      setNewWarehouses({
        hang_Hoa_Id: '',
        kho_Id: '',
        so_Luong: 0,
        nSX_Id: '',
        tong_Gia_Tri_PN: 0,
        tong_Gia_Tri_PX: 0,
        danh_Muc_Id: ''
      });
    }
  }, [showModalEdit]);

  // Fetch data kho từ server
  const fetchWarehouse = async () => {
    try {
      const params = {};
      if (searchTerm) params.searchTerm = searchTerm;
      if (selectedCategory) params.danh_Muc_Id = selectedCategory;  // Lọc theo danh mục
      if (selectedProducer) params.nSX_Id = selectedProducer;  // Lọc theo nhà sản xuất

      const response = await axios.get('http://localhost:8000/tonkho', { params });
      setWarehouse(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách kho:", error);
      alert("Không thể tải dữ liệu kho hàng. Hãy thử lại sau.");
    }
  };


  // Fetch danh mục sản phẩm
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/danhmuc');
      console.log('Dữ liệu nhà sản xuất:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh mục:", error);
    }
  };

  const fetchProducers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/nhasanxuat');
      console.log('Dữ liệu nhà sản xuất:', response.data);  // Kiểm tra dữ liệu nhận được từ API
      setProducers(response.data);
    } catch (error) {
      console.error("Lỗi khi tải nhà sản xuất:", error);
    }
  };


  // Hàm tìm kiếm khi người dùng nhập vào ô tìm kiếm
  const handleSearch = () => {
    fetchWarehouse();
  };

  const handleUpdateWarehouse = async () => {
    const { hang_Hoa_Id, kho_Id, so_Luong, nSX_Id, tong_Gia_Tri_PN, tong_Gia_Tri_PX, danh_Muc_Id } = newWarehouses;
    if (!hang_Hoa_Id.trim() || !kho_Id.trim() || !so_Luong || !nSX_Id.trim() || !tong_Gia_Tri_PN || !tong_Gia_Tri_PX || !danh_Muc_Id.trim()) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/tonkho/${newWarehouses.ID}`, newWarehouses);
      if (response.status === 200) {
        console.log("Cập nhật thành công:", response.data);
        await fetchWarehouse();
        alert("Cập nhật tồn kho thành công.");
        setShowModalEdit(false);
      } else {
        alert("Có lỗi xảy ra khi cập nhật tồn kho.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật tồn kho:", error);
      alert("Có lỗi xảy ra trong quá trình cập nhật tồn kho.");
    }
  };

  const handleDeleteWarehouse = async (warehouseId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:8000/tonkho/${warehouseId}`);
      setWarehouse(warehouses.filter(warehouse => warehouse.ID !== warehouseId));
      alert("Xóa thành công hàng hóa.");
    } catch (error) {
      console.error("Lỗi khi xóa hàng hóa:", error);
      alert("Có lỗi xảy ra trong quá trình xóa hàng hóa.");
    }
  };

  const handleEditClick = (item) => {
    setNewWarehouses({
      id: item.ID,
      hang_Hoa_Id: item.hang_Hoa_Id,
      kho_Id: item.kho_Id,
      so_Luong: item.so_Luong,
      nSX_Id: item.nSX_Id,
      tong_Gia_Tri_PN: item.tong_Gia_Tri_PN,
      tong_Gia_Tri_PX: item.tong_Gia_Tri_PX,
      danh_Muc_Id: item.danh_Muc_Id
    });
    setShowModalEdit(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewWarehouses({ ...newWarehouses, [name]: value });
  };

  const handleCancelEdit = () => {
    setShowModalEdit(false);
  };

  const handleAddClickCategories = () => {
    setShowModalCategories(true);
  };

  const handleAddClickProducer = () => {
    setShowModalProducer(true);
  };

  const closeModalCategories = () => {
    setShowModalCategories(false);
  };

  const closeModalProducer = () => {
    setShowModalProducer(false);
  };

  return (
    <div className="inventory-page">
      <div className="search-filter-section">
        {/* Ô nhập tìm kiếm theo tên hàng hóa */}
        <input
          type="text"
          placeholder="Nhập tên hoặc mã sản phẩm để tìm kiếm"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật searchTerm khi người dùng nhập
        />
        <button className="filter-button" title="Tìm kiếm" onClick={handleSearch}>Tìm Kiếm</button>

        {/* Lọc theo danh mục */}
        <select
          className="filter-dropdown"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} // Cập nhật selectedCategory khi người dùng chọn danh mục
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((category) => (
            <option key={category.ID} value={category.ID}>{category.ten_Danh_Muc}</option>  // Sử dụng ten_Danh_Muc thay vì name
          ))}
        </select>

        <button className="filter-button" title="Thêm" onClick={handleAddClickCategories}>Thêm</button>

        {showModalCategories && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={closeModalCategories}>&times;</button>
              <Categories />
            </div>
          </div>
        )}

        {/* Lọc theo nhà sản xuất */}
        <select
          className="filter-dropdown"
          value={selectedProducer}
          onChange={(e) => setSelectedProducer(e.target.value)} // Cập nhật selectedProducer khi người dùng chọn nhà sản xuất
        >
          <option value="">-- Chọn nhà sản xuất --</option>
          {producers.map((producer) => (
            <option key={producer.ID} value={producer.ID}>{producer.ten_nSX}</option>
          ))}
        </select>


        <button className="filter-button" onClick={handleAddClickProducer}>Thêm</button>

        {showModalProducer && (
          <div className="modal">
            <div className="modal-content">
              <button className="close" onClick={closeModalProducer}>&times;</button>
              <Producer />
            </div>
          </div>
        )}
      </div>

      <table className="inventory-table">
        <thead>
          <tr>
            <th>Loại Hàng Hóa</th>
            <th>Kho</th>
            <th>Số Lượng</th>
            <th>Nhà sản xuất</th>
            <th>Nhân Viên</th>
            <th>Tổng Xuất</th>
            <th>Tổng Nhập</th>
            <th>Danh Mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((item) => (
            <tr key={item.ID}>
              <td>{item.hang_Hoa_Id}</td>
              <td>{item.kho_Id}</td>
              <td>{item.so_Luong}</td>
              <td>{item.nSX_Id}</td>
              <td>{item.nhan_Vien_Id}</td>
              <td>{formatter.format(item.tong_Gia_Tri_PN)}</td>
              <td>{formatter.format(item.tong_Gia_Tri_PX)}</td>
              <td>{item.danh_Muc_Id}</td>
              <td>
                <button className="btn_edit" onClick={() => handleEditClick(item)}>Sửa</button>
                <button className="btn_delete" onClick={() => handleDeleteWarehouse(item.ID)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModalEdit && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={handleCancelEdit}>&times;</button>
            <h2>Chỉnh sửa sản phẩm</h2>
            <input type="text" name="hang_Hoa_Id" placeholder="Loại Hàng Hóa" value={newWarehouses.hang_Hoa_Id} onChange={handleFormChange} />
            <input type="text" name="kho_Id" placeholder="Mã kho" value={newWarehouses.kho_Id} onChange={handleFormChange} />
            <input type="number" name="so_Luong" placeholder="Số lượng" value={newWarehouses.so_Luong} onChange={handleFormChange} />
            <input type="text" name="nSX_Id" placeholder="Nhà sản xuất" value={newWarehouses.nSX_Id} onChange={handleFormChange} />
            <input type="text" name="nhan_Vien_Id" placeholder="Nhân Viên" value={newWarehouses.nhan_Vien_Id} onChange={handleFormChange} />
            <input type="number" name="tong_Gia_Tri_PN" placeholder="Tổng giá trị PN" value={newWarehouses.tong_Gia_Tri_PN} onChange={handleFormChange} />
            <input type="number" name="tong_Gia_Tri_PX" placeholder="Tổng giá trị PX" value={newWarehouses.tong_Gia_Tri_PX} onChange={handleFormChange} />
            <input type="text" name="danh_Muc_Id" placeholder="Danh mục" value={newWarehouses.danh_Muc_Id} onChange={handleFormChange} />
            <button onClick={handleUpdateWarehouse}>Lưu</button>
            <button onClick={handleCancelEdit}>Hủy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Warehouse;
