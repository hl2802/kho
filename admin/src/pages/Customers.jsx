import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/table/Table'; // Assuming you have a Table component

// Dữ liệu tiêu đề của bảng
const customerTableHead = [
    'STT',
    'Họ và Tên',
    'Chức Vụ',
    'Số Điện Thoại',
    'Địa Chỉ'
];

// Hàm để render tiêu đề bảng
const renderHead = (item, index) => <th key={index}>{item}</th>;

// Hàm để render các hàng trong bảng
const renderBody = (item, index) => (
    <tr key={index}>
        <td>{index + 1}</td> {/* Số thứ tự */}
        <td>{item.ho_Ten}</td> {/* Họ và tên */}
        <td>{item.chuc_Vu}</td> {/* Chức vụ */}
        <td>{item.so_Dien_Thoai}</td> {/* Số điện thoại */}
        <td>{item.dia_Chi}</td> {/* Địa chỉ */}
    </tr>
);

const Customers = () => {
    const [customers, setCustomers] = useState([]); // Dữ liệu khách hàng
    const [loading, setLoading] = useState(true); // Trạng thái loading
    const [error, setError] = useState(null); // Trạng thái lỗi

    useEffect(() => {
        // Hàm gọi API để lấy dữ liệu nhân viên
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/nhanvien/employees');
                
                // Kiểm tra nếu dữ liệu trả về hợp lệ
                if (response.data && response.data.data && Array.isArray(response.data.data)) {
                    setCustomers(response.data.data); // Lưu dữ liệu vào state
                } else {
                    setError('Không có dữ liệu'); // Nếu không có dữ liệu
                }
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu:', err); // In lỗi ra console nếu có
                setError('Đã có lỗi khi lấy dữ liệu'); // Hiển thị thông báo lỗi
            } finally {
                setLoading(false); // Kết thúc trạng thái loading
            }
        };

        fetchCustomers(); // Gọi hàm lấy dữ liệu khi component được mount
    }, []); // Hàm gọi API chỉ chạy 1 lần khi component mount

    // Nếu đang tải dữ liệu, hiển thị thông báo loading
    if (loading) {
        return <div>Đang tải...</div>;
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2 className="page-header">Danh sách Nhân Viên</h2> {/* Tiêu đề trang */}
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            {/* Gọi component Table để hiển thị dữ liệu */}
                            <Table
                                limit={10} // Giới hạn số dòng hiển thị
                                headData={customerTableHead} // Truyền tiêu đề bảng
                                renderHead={renderHead} // Truyền hàm render tiêu đề
                                bodyData={customers} // Truyền dữ liệu khách hàng
                                renderBody={renderBody} // Truyền hàm render nội dung từng hàng
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
