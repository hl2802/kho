import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/danhmuc');
      setCategories(response.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách danh mục:", error);
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      try {
        const response = await axios.post('http://localhost:8000/danhmuc', { ten_Danh_Muc: newCategoryName });
        setCategories([...categories, response.data.data]);
        setNewCategoryName('');
      } catch (error) {
        console.error("Lỗi khi thêm danh mục:", error);
      }
    }
  };

  const handleUpdateCategory = async () => {
    if (!editedCategoryName.trim()) {
      alert("Vui lòng nhập tên danh mục.");
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8000/danhmuc/${editingId}`, { ten_Danh_Muc: editedCategoryName });
      setCategories(categories.map(category => category.ID === editingId ? response.data.data : category));
      setEditingId(null);
      setEditedCategoryName('');
      alert("Cập nhật thành công danh mục.");
    } catch (error) {
      console.error("Lỗi khi cập nhật danh mục:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) return;

    try {
      const response = await axios.delete(`http://localhost:8000/danhmuc/${categoryId}`);
      if (response.status === 200) {
        setCategories(categories.filter(category => category.ID !== categoryId));
        alert("Xóa thành công danh mục.");
      } else {
        alert("Không thể xóa danh mục. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi xóa danh mục:", error);
      alert("Lỗi khi xóa danh mục.");
    }
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="categories">
      <h2>Danh mục sản phẩm</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((category) => (
            <tr key={category.ID}>
              <td>{category.ID}</td>
              <td>
                {editingId === category.ID ? (
                  <input
                    type="text"
                    value={editedCategoryName}
                    onChange={(e) => setEditedCategoryName(e.target.value)}
                  />
                ) : (
                  category.ten_Danh_Muc
                )}
              </td>
              <td>
                {editingId === category.ID ? (
                  <>
                    <button onClick={handleUpdateCategory}>Lưu</button>
                    <button onClick={() => { setEditingId(null); setEditedCategoryName(''); }}>Hủy</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => {
                      setEditingId(category.ID);
                      setEditedCategoryName(category.ten_Danh_Muc);
                    }}>Sửa</button>
                    <button onClick={() => handleDeleteCategory(category.ID)}>Xóa</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>

      <div className="add-category">
        <input
          type="text"
          placeholder="Nhập tên danh mục"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
        />
        <button onClick={handleAddCategory} disabled={!newCategoryName.trim()}>
          Thêm danh mục
        </button>
      </div>
    </div>
  );
};

export default Categories;
