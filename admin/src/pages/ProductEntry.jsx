import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/Warehouse.css";
import { formatter } from "../components/fomater.jsx";

const ProductEntry = () => {
    const [productEntry, setProductEntry] = useState([]);
    const [searchId, setSearchId] = useState(''); // Thêm state cho tìm kiếm theo ID
    const [editProductEntry, setEditProductEntry] = useState({});
    const [newProductEntry, setNewProductEntry] = useState({
        ma_Phieu: '',
        ten_Nhap: '',
        nha_Cung_Cap_Id: '',
        kho_Id: '',
        nhan_Vien_Id: '',
        tong_Gia_Tri: '',
        ngay_Nhap: '',
        hang_hoa_Id: '',
        danh_muc_Id: '',
        so_Luong: 0
    });

    const [editIndex, setEditIndex] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleClick = () => {
        setIsAdding(true); // Chế độ thêm
        setEditIndex(null); // Reset chỉ mục chỉnh sửa
        setNewProductEntry({
            ma_Phieu: '',
            ten_Nhap: '',
            nha_Cung_Cap_Id: '',
            kho_Id: '',
            nhan_Vien_Id: '',
            tong_Gia_Tri: '',
            ngay_Nhap: '',
            hang_hoa_Id: '',
            danh_muc_Id: '',
            so_Luong: 0
        }); // Reset form
        setShowModal(true); // Hiển thị modal
    };
    const handleCancel = () => {
        setEditIndex(null); // Reset chỉ mục chỉnh sửa
        setIsAdding(false); // Chế độ không thêm
        setShowModal(false); // Đóng modal
    };
    const handleFormChange = (e) => {
        const { name, value } = e.target;

        // Kiểm tra nếu đang thêm mới, cập nhật trạng thái mới, nếu không thì cập nhật trạng thái chỉnh sửa
        if (isAdding) {
            setNewProductEntry({ ...newProductEntry, [name]: value });
        } else {
            setEditProductEntry({ ...editProductEntry, [name]: value });
        }
    };


    useEffect(() => {
        fetchProductsEntry(); // Tải danh sách phiếu nhập khi component render lần đầu tiên
    }, []);

    // Hàm tải danh sách phiếu nhập từ API
    const fetchProductsEntry = async () => {
        try {
            const response = await axios.get('http://localhost:8000/phieunhap');
            setProductEntry(response.data); // Lưu danh sách phiếu nhập vào state
        } catch (error) {
            console.error("Lỗi khi tải danh sách:", error);
        }
    };

    // Hàm tìm kiếm phiếu nhập theo ID
    const handleSearchById = async () => {
        if (!searchId.trim()) {
            alert("Vui lòng nhập ID phiếu nhập.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/phieunhap/${searchId}`);
            setProductEntry([response.data]); // Cập nhật state với phiếu nhập tìm thấy
        } catch (error) {
            console.error("Lỗi khi tìm phiếu nhập:", error);
            alert("Không tìm thấy phiếu nhập với ID này.");
        }
    };

    // Các hàm khác để thêm, sửa, xóa phiếu nhập...
    const handleAddProductEntry = async () => {
        const { ma_Phieu, ten_Nhap, nha_Cung_Cap_Id, kho_Id, nhan_Vien_Id, tong_Gia_Tri, ngay_Nhap, hang_hoa_Id, danh_muc_Id, so_Luong } = newProductEntry;
        if (!ma_Phieu || !ten_Nhap || !nha_Cung_Cap_Id || !kho_Id || !nhan_Vien_Id || !tong_Gia_Tri || !ngay_Nhap || !hang_hoa_Id || !danh_muc_Id || !so_Luong) {
            console.log("Dữ liệu không hợp lệ", newProductEntry);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/phieunhap', newProductEntry);
            if (response.data && response.data.data) {
                setProductEntry([...productEntry, response.data.data]);
                alert("Thêm thành công phiếu nhập.");
                setNewProductEntry({
                    ma_Phieu: '',
                    ten_Nhap: '',
                    nha_Cung_Cap_Id: '',
                    kho_Id: '',
                    nhan_Vien_Id: '',
                    tong_Gia_Tri: '',
                    ngay_Nhap: '',
                    hang_hoa_Id: '',
                    danh_muc_Id: '',
                    so_Luong: 0
                });
            } else {
                console.error("Phản hồi API không đúng định dạng:", response.data);
            }
        } catch (error) {
            console.error("Lỗi khi thêm phiếu nhập:", error);
            alert("Có lỗi xảy ra trong quá trình thêm phiếu nhập.");
        }
    };

    // Hàm cập nhật phiếu nhập...
    const handleUpdateProductEntry = async (updatedProductEntry) => {
        const { ma_Phieu, ten_Nhap, nha_Cung_Cap_Id, kho_Id, nhan_Vien_Id, tong_Gia_Tri, ngay_Nhap, hang_hoa_Id, danh_muc_Id, so_Luong } = updatedProductEntry;
        if (!ma_Phieu || !ten_Nhap || !nha_Cung_Cap_Id || !kho_Id || !nhan_Vien_Id || !tong_Gia_Tri || !ngay_Nhap || !hang_hoa_Id || !danh_muc_Id || !so_Luong) {
            console.log("Dữ liệu không hợp lệ", updatedProductEntry);
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8000/phieunhap/${updatedProductEntry.ID}`, updatedProductEntry);
            if (response.data && response.data.data) {
                setProductEntry(productEntry.map(entry => entry.ID === updatedProductEntry.ID ? response.data.data : entry));
                alert("Cập nhật thành công phiếu nhập.");
            } else {
                console.error("Phản hồi API không đúng định dạng:", response.data);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật phiếu nhập:", error);
            alert("Có lỗi xảy ra trong quá trình cập nhật phiếu nhập.");
        }
    };

    // Hàm xóa phiếu nhập...
    const handleDeleteProductEntry = async (productEntryId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phiếu nhập này?")) return;

        try {
            await axios.delete(`http://localhost:8000/phieunhap/${productEntryId}`);
            setProductEntry(productEntry.filter(entry => entry.ID !== productEntryId));
            alert("Xóa thành công phiếu nhập.");
        } catch (error) {
            console.error("Lỗi khi xóa phiếu nhập:", error);
            alert("Có lỗi xảy ra trong quá trình xóa phiếu nhập.");
        }
    };

    return (
        <div className="inventory-page">
            <div className="search-filter-section">
                <input
                    type="text"
                    placeholder="Nhập ID phiếu nhập để tìm kiếm"
                    className="search-input"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)} // Cập nhật state khi người dùng nhập ID
                />
                <button className="filter-button" onClick={handleSearchById}>Tìm kiếm</button>
                <button className="filter-button" onClick={handleClick}>Thêm phiếu nhập</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close" onClick={handleCancel}>&times;</button>
                        <h2>{isAdding ? "Thêm Phiếu Nhập" : "Chỉnh Sửa Phiếu Nhập"}</h2>
                        {/* Các trường nhập liệu trong form */}
                        <input type="text" name="ma_Phieu" placeholder="Mã phiếu" value={isAdding ? newProductEntry.ma_Phieu : editProductEntry.ma_Phieu} onChange={handleFormChange} />
                        <input type="text" name="ten_Nhap" placeholder="Tên Phiếu Nhập" value={isAdding ? newProductEntry.ten_Nhap : editProductEntry.ten_Nhap} onChange={handleFormChange} />
                        {/* Các input khác */}
                        <button onClick={isAdding ? handleAddProductEntry : () => handleUpdateProductEntry(editProductEntry)}>Lưu</button>
                        <button onClick={handleCancel}>Hủy</button>
                    </div>
                </div>
            )}

            {/* Bảng danh sách phiếu nhập */}
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Mã Phiếu Nhập</th>
                        <th>Tên Sản Phẩm Nhập</th>
                        <th>Nhà Cung Cấp</th>
                        <th>Mã Kho</th>
                        <th>Mã Nhân Viên</th>
                        <th>Tổng Giá Trị</th>
                        <th>Ngày Nhập</th>
                        <th>Mã Hàng Hóa</th>
                        <th>Mã Danh Mục</th>
                        <th>Số Lượng</th>
                        <th>Hành Động</th>
                    </tr>
                </thead>
                <tbody>
                    {productEntry.map(entry => (
                        <tr key={entry.ID}>
                            <td>{entry.ma_Phieu}</td>
                            <td>{entry.ten_Nhap}</td>
                            <td>{entry.nha_Cung_Cap_Id}</td>
                            <td>{entry.kho_Id}</td>
                            <td>{entry.nhan_Vien_Id}</td>
                            <td>{formatter.format(entry.tong_Gia_Tri)}</td>
                            <td>{entry.ngay_Nhap}</td>
                            <td>{entry.hang_hoa_Id}</td>
                            <td>{entry.danh_muc_Id}</td>
                            <td>{entry.so_Luong}</td>
                            <td>
                                <button className="btn_edit" onClick={() => {
                                    setIsAdding(false);
                                    setEditProductEntry(entry);
                                    setShowModal(true);
                                }}>Sửa</button>
                                <button className="btn_delete" onClick={() => handleDeleteProductEntry(entry.ID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductEntry;
