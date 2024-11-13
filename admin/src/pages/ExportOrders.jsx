import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/ExportOrders.css';
import { formatter } from "../components/fomater.jsx";

const ExportOrders = () => {
    const [Order, setOrder] = useState([]);
    const [searchId, setSearchId] = useState(''); // State để lưu ID tìm kiếm
    const [editOrder, setEditOrder] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [showModal, setShowModal] = useState(false); // Modal state
    const [newOrder, setNewOrder] = useState({
        ma_Phieu: '',
        ngay_Xuat: '',
        kho_Id: '',
        nhan_Vien_Id: '',
        tong_Gia_Tri: 0,
        hang_Hoa_Id: '',
        danh_muc_Id: '',
        so_Luong: 0
    });

    useEffect(() => {
        fetchExproOrder();
    }, []);

    // Hàm tải danh sách phiếu xuất
    const fetchExproOrder = async () => {
        try {
            const response = await axios.get('http://localhost:8000/phieuxuat');
            setOrder(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách:", error);
        }
    };

    // Hàm tìm kiếm phiếu xuất theo ID
    const handleSearchById = async () => {
        if (!searchId.trim()) {
            alert("Vui lòng nhập ID phiếu xuất.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8000/phieuxuat/${searchId}`);
            setOrder([response.data]); // Cập nhật danh sách với phiếu xuất tìm được
        } catch (error) {
            console.error("Lỗi khi tìm phiếu xuất:", error);
            alert("Không tìm thấy phiếu xuất với ID này.");
        }
    };

    const handleAddProductOrder = async () => {
        // Kiểm tra nếu các trường đều có giá trị
        const { ma_Phieu, ngay_Xuat, kho_Id, nhan_Vien_Id, tong_Gia_Tri, hang_Hoa_Id, danh_muc_Id, so_Luong } = newOrder;
        if (!ma_Phieu || !ngay_Xuat || !kho_Id || !nhan_Vien_Id || !tong_Gia_Tri || !hang_Hoa_Id || !danh_muc_Id || !so_Luong) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/phieuxuat', newOrder);
            if (response.data && response.data.data) {
                setOrder([...Order, response.data.data]);
                alert("Thêm thành công hàng hóa.");
                setNewOrder({
                    ma_Phieu: '',
                    ngay_Xuat: '',
                    kho_Id: '',
                    nhan_Vien_Id: '',
                    tong_Gia_Tri: '',
                    hang_Hoa_Id: '',
                    danh_muc_Id: '',
                    so_Luong: ''
                });
            } else {
                console.error("Phản hồi API không đúng định dạng:", response.data);
            }
        } catch (error) {
            console.error("Lỗi khi thêm hàng hóa:", error);
            alert("Có lỗi xảy ra trong quá trình thêm hàng hóa.");
        }
    };

    const handleUpdateOrder = async () => {
        const { ma_Phieu, ngay_Xuat, kho_Id, nhan_Vien_Id, tong_Gia_Tri, hang_Hoa_Id, danh_muc_Id, so_Luong } = editOrder;
        if (!ma_Phieu || !ngay_Xuat || !kho_Id || !nhan_Vien_Id || !tong_Gia_Tri || !hang_Hoa_Id || !danh_muc_Id || !so_Luong) {
            alert("Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:8000/phieuxuat/${editOrder.ID}`, editOrder);
            if (response.data && response.data.data) {
                setOrder(Order.map(order =>
                    order.ID === editOrder.ID ? response.data.data : order
                ));
                alert("Cập nhật thành công phiếu xuất.");
            } else {
                console.error("Phản hồi API không đúng định dạng:", response.data);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật phiếu xuất:", error);
            alert("Có lỗi xảy ra trong quá trình cập nhật phiếu xuất.");
        }
    };

    const handleDeleteProductOrder = async (orderId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa phiếu xuất này?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:8000/phieuxuat/${orderId}`);
            setOrder(Order.filter(order => order.ID !== orderId));
            alert("Xóa thành công phiếu xuất.");
        } catch (error) {
            console.error("Lỗi khi xóa phiếu xuất:", error);
            alert("Có lỗi xảy ra trong quá trình xóa phiếu xuất.");
        }
    };

    const handleClick = () => {
        setIsAdding(true);
        setNewOrder({
            ma_Phieu: '',
            ngay_Xuat: '',
            kho_Id: '',
            nhan_Vien_Id: '',
            tong_Gia_Tri: 0,
            hang_Hoa_Id: '',
            danh_muc_Id: '',
            so_Luong: 0
        });
        setShowModal(true);
    };

    const handleEdit = (order) => {
        setIsAdding(false);
        setEditOrder(order);
        setShowModal(true);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        if (isAdding) {
            setNewOrder({ ...newOrder, [name]: value });
        } else {
            setEditOrder({ ...editOrder, [name]: value });
        }
    };

    const handleCancel = () => {
        setIsAdding(false);
        setShowModal(false);
    };

    return (
        <div className="inventory-page">
            <div className="search-filter-section">
                <input
                    type="text"
                    placeholder="Nhập ID phiếu xuất để tìm kiếm"
                    className="search-input"
                    value={searchId} // Giới thiệu state tìm kiếm
                    onChange={(e) => setSearchId(e.target.value)} // Cập nhật ID tìm kiếm
                />
                <button className="filter-button" onClick={handleSearchById}>Tìm Kiếm</button>
                <button className="filter-button" onClick={handleClick}>Thêm Phiếu Xuất Sản Phẩm</button>
            </div>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <button className="close" onClick={handleCancel}>&times;</button>
                        <h2>{isAdding ? "Thêm Phiếu Xuất" : "Chỉnh Sửa Phiếu Xuất"}</h2>
                        <input type="text" name="ma_Phieu" placeholder="Mã phiếu" value={isAdding ? newOrder.ma_Phieu : editOrder.ma_Phieu} onChange={handleFormChange} />
                        <input type="date" name="ngay_Xuat" placeholder="Ngày Xuất" value={isAdding ? newOrder.ngay_Xuat : editOrder.ngay_Xuat} onChange={handleFormChange} />
                        <input type="text" name="kho_Id" placeholder="Kho" value={isAdding ? newOrder.kho_Id : editOrder.kho_Id} onChange={handleFormChange} />
                        <input type="text" name="nhan_Vien_Id" placeholder="Nhân Viên" value={isAdding ? newOrder.nhan_Vien_Id : editOrder.nhan_Vien_Id} onChange={handleFormChange} />
                        <input type="text" name="tong_Gia_Tri" placeholder="Tổng Giá Trị" value={isAdding ? newOrder.tong_Gia_Tri : editOrder.tong_Gia_Tri} onChange={handleFormChange} />
                        <input type="text" name="hang_Hoa_Id" placeholder="Hàng hóa" value={isAdding ? newOrder.hang_Hoa_Id : editOrder.hang_Hoa_Id} onChange={handleFormChange} />
                        <input type="text" name="danh_muc_Id" placeholder="Danh Mục" value={isAdding ? newOrder.danh_muc_Id : editOrder.danh_muc_Id} onChange={handleFormChange} />
                        <input type="number" name="so_Luong" placeholder="Số Lượng" value={isAdding ? newOrder.so_Luong : editOrder.so_Luong} onChange={handleFormChange} />
                        <button onClick={isAdding ? handleAddProductOrder : handleUpdateOrder}>Lưu Thông Tin Phiếu Xuất</button>
                        <button onClick={handleCancel}>Hủy Thay Đổi</button>
                    </div>
                </div>
            )}
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Mã Phiếu Xuất</th>
                        <th>Ngày Xuất Sản Phẩm</th>
                        <th>Mã Kho</th>
                        <th>Nhân Viên</th>
                        <th>Tổng Giá Trị</th>
                        <th>Tên Hàng Hóa</th>
                        <th>Danh Mục</th>
                        <th>Số Lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {Order.map(order => (
                        <tr key={order.ID}>
                            <td>{order.ma_Phieu}</td>
                            <td>{order.ngay_Xuat}</td>
                            <td>{order.kho_Id}</td>
                            <td>{order.nhan_Vien_Id}</td>
                            <td>{formatter.format(order.tong_Gia_Tri)}</td>
                            <td>{order.hang_Hoa_Id}</td>
                            <td>{order.danh_muc_Id}</td>
                            <td>{order.so_Luong}</td>
                            <td>
                                <button className="btn_edit" onClick={() => handleEdit(order)}>Sửa</button>
                                <button className="btn_delete" onClick={() => handleDeleteProductOrder(order.ID)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExportOrders;
