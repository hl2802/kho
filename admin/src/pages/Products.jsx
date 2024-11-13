import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Warehouse.css";
import { formatter } from "../components/fomater.jsx";

const Products = () => {
    const [searchQuery, setSearchQuery] = useState(''); // Trạng thái tìm kiếm
    const [filteredProducts, setFilteredProducts] = useState([]); // Lưu trữ kết quả tìm kiếm
    const [products, setProducts] = useState([]);  // Danh sách sản phẩm
    const [product, setProduct] = useState({       // Sản phẩm thêm/sửa
        id: '',
        ma_Hang: '',
        ten_Hang: '',
        danh_Muc_Id: '',
        nSX_Id: '',
        so_Luong: '',
        gia_Ban: '',
        mo_Ta: ''
    });
    const [isAdding, setIsAdding] = useState(false);  // Kiểm tra chế độ thêm hay sửa
    const [showModal, setShowModal] = useState(false);  // Hiển thị modal

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/hanghoa');
            setProducts(response.data);
            setFilteredProducts(response.data); // Lưu tất cả sản phẩm
        } catch (error) {
            console.error("Lỗi khi tải danh sách hàng hóa:", error);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchProducts(); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả sản phẩm
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/hanghoa/find/${searchQuery}`);
            setFilteredProducts(response.data);
        } catch (error) {
            console.error("Lỗi khi tìm kiếm sản phẩm:", error);
            alert("Có lỗi xảy ra khi tìm kiếm sản phẩm.");
        }
    };


    // Thêm hoặc cập nhật sản phẩm
    const handleSaveProduct = async () => {
        const { ma_Hang, ten_Hang, mo_Ta, so_Luong, gia_Ban, nSX_Id, danh_Muc_Id } = product;

        // Validate fields
        if (!ma_Hang || !ten_Hang || !mo_Ta || !so_Luong || !gia_Ban || !nSX_Id || !danh_Muc_Id) {
            alert("Vui lòng điền đầy đủ thông tin sản phẩm.");
            return;
        }

        try {
            let response;
            if (isAdding) {
                response = await axios.post('http://localhost:8000/hanghoa', product); // Thêm mới sản phẩm
            } else {
                response = await axios.put(`http://localhost:8000/hanghoa/${product.ID}`, product); // Cập nhật sản phẩm
            }

            if (response.data && response.data.data) {
                setProducts(prevProducts =>
                    isAdding ? [...prevProducts, response.data.data] : prevProducts.map(p => p.id === product.ID ? response.data.data : p)
                );
                alert(isAdding ? "Thêm thành công hàng hóa." : "Cập nhật thành công hàng hóa.");
                resetForm();
            } else {
                console.error("Phản hồi API không đúng định dạng:", response.data);
            }
        } catch (error) {
            console.error("Lỗi khi thao tác với hàng hóa:", error);
            alert("Có lỗi xảy ra trong quá trình thao tác với hàng hóa.");
        }
    };

    // Xóa sản phẩm
    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

        try {
            await axios.delete(`http://localhost:8000/hanghoa/${productId}`);
            setProducts(products.filter(product => product.ID !== productId));
            alert("Xóa thành công hàng hóa.");
        } catch (error) {
            console.error("Lỗi khi xóa hàng hóa:", error);
            alert("Có lỗi xảy ra trong quá trình xóa hàng hóa.");
        }
    };

    // Cập nhật hoặc thêm mới sản phẩm trong form
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({ ...prevProduct, [name]: value }));
    };

    // Mở modal thêm sản phẩm
    const openAddModal = () => {
        setIsAdding(true);
        setProduct({ id: '', ma_Hang: '', ten_Hang: '', danh_Muc_Id: '', nSX_Id: '', so_Luong: '', gia_Ban: '', mo_Ta: '' });
        setShowModal(true);
    };

    // Mở modal chỉnh sửa sản phẩm
    const openEditModal = (product) => {
        setIsAdding(false);
        setProduct(product);
        setShowModal(true);
    };

    // Đóng modal
    const closeModal = () => setShowModal(false);

    // Reset form
    const resetForm = () => {
        setProduct({ id: '', ma_Hang: '', ten_Hang: '', danh_Muc_Id: '', nSX_Id: '', so_Luong: '', gia_Ban: '', mo_Ta: '' });
        setIsAdding(false);
        setShowModal(false);
    };

    return (
        <div className="inventory-page">
            <div className="search-filter-section">
                <input
                    type="text"
                    placeholder="Nhập tên hoặc mã sản phẩm để tìm kiếm"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật trạng thái tìm kiếm
                />
                <button className="filter-button" onClick={handleSearch}>Tìm kiếm</button>
                <button className="filter-button" onClick={openAddModal}>Thêm sản phẩm</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close" onClick={closeModal}>&times;</button>
                        <h2>{isAdding ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}</h2>
                        <input type="text" name="ma_Hang" placeholder="Mã hàng" value={product.ma_Hang} onChange={handleFormChange} />
                        <input type="text" name="ten_Hang" placeholder="Tên sản phẩm" value={product.ten_Hang} onChange={handleFormChange} />
                        <input type="text" name="mo_Ta" placeholder="Mô tả" value={product.mo_Ta} onChange={handleFormChange} />
                        <input type="number" name="gia_Ban" placeholder="Giá Bán" value={product.gia_Ban} onChange={handleFormChange} />
                        <input type="number" name="so_Luong" placeholder="Số lượng" value={product.so_Luong} onChange={handleFormChange} />
                        <input type="text" name="nSX_Id" placeholder="Nhà sản xuất" value={product.nSX_Id} onChange={handleFormChange} />
                        <input type="text" name="danh_Muc_Id" placeholder="Danh Mục" value={product.danh_Muc_Id} onChange={handleFormChange} />
                        <button onClick={handleSaveProduct}>Lưu Thay Đổi</button>
                        <button onClick={resetForm}>Hủy Thay Đổi</button>
                    </div>
                </div>
            )}

            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Mã hàng</th>
                        <th>Tên sản phẩm</th>
                        <th>Mô tả</th>
                        <th>Giá Bán</th>
                        <th>Số Lượng</th>
                        <th>Nhà Sản Xuất</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {(searchQuery ? filteredProducts : products).map((product) => (
                        <tr key={product.ID}>
                            <td>{product.ma_Hang}</td>
                            <td>{product.ten_Hang}</td>
                            <td>{product.mo_Ta}</td>
                            <td>{formatter.format(product.gia_Ban)}</td>
                            <td>{product.so_Luong}</td>
                            <td>{product.nSX_Id}</td>
                            <td>
                                <button className="btn_edit" onClick={() => openEditModal(product)}>Sửa</button>
                                <button className="btn_delete" onClick={() => handleDeleteProduct(product.ID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default Products;
