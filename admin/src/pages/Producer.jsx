import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/Categories.css";

const Producer = () => {
    const [producers, setProducers] = useState([]);
    const [newProducerName, setNewProducerName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editedProducerName, setEditedProducerName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchProducers();
    }, []);

    const fetchProducers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/nhasanxuat');
            setProducers(response.data);
        } catch (error) {
            console.error("Lỗi khi tải danh sách nhà sản xuất:", error);
        }
    };

    const handleAddProducer = async () => {
        if (newProducerName.trim()) {
            try {
                const response = await axios.post('http://localhost:8000/nhasanxuat', { ten_nSX: newProducerName });
                setProducers([...producers, response.data.data]);
                setNewProducerName('');
                alert("Thêm thành công nhà sản xuất.");
            } catch (error) {
                console.error("Lỗi khi thêm nhà sản xuất:", error);
            }
        }
    };

    const handleUpdateProducer = async () => {
        if (!editedProducerName.trim()) {
            alert("Vui lòng điền tên nhà sản xuất.");
            return;
        }
        try {
            // Thực hiện PUT request để cập nhật tên nhà sản xuất
            const response = await axios.put(`http://localhost:8000/nhasanxuat/${editingId}`, { ten_nSX: editedProducerName });

            if (response.status === 200) {
                // Cập nhật danh sách `producers` bằng cách sử dụng dữ liệu từ phản hồi
                setProducers((prevProducers) =>
                    prevProducers.map((prod) => (prod.ID === editingId ? response.data.data : prod))
                );

                // Đặt lại các trạng thái liên quan đến chỉnh sửa
                setEditingId(null);
                setEditedProducerName('');
                alert("Cập nhật thành công nhà sản xuất.");
            } else {
                console.warn("Phản hồi không mong đợi từ server:", response.status);
                alert("Có lỗi xảy ra khi cập nhật nhà sản xuất.");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật nhà sản xuất:", error);
        }
    };


    const handleDeleteProducer = async (producerId) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa nhà sản xuất này?")) return;
        try {
            await axios.delete(`http://localhost:8000/nhasanxuat/${producerId}`);
            setProducers(producers.filter(prod => prod.ID !== producerId));
            alert("Xóa thành công nhà sản xuất.");
        } catch (error) {
            console.error("Lỗi khi xóa nhà sản xuất:", error);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = producers.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="categories">
            <h2>Nhà Sản Xuất</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên Nhà Sản Xuất</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((prod) => (
                        <tr key={prod.ID}>
                            <td>{prod.ID}</td>
                            <td>
                                {editingId === prod.ID ? (
                                    <input
                                        type="text"
                                        value={editedProducerName}
                                        onChange={(e) => setEditedProducerName(e.target.value)}
                                    />
                                ) : (
                                    prod.ten_nSX
                                )}
                            </td>
                            <td>
                                {editingId === prod.ID ? (
                                    <>
                                        <button onClick={handleUpdateProducer}>Lưu</button>
                                        <button onClick={() => { setEditingId(null); setEditedProducerName(''); }}>Hủy</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={() => {
                                            setEditingId(prod.ID);
                                            setEditedProducerName(prod.ten_nSX);
                                        }}>Sửa</button>
                                        <button onClick={() => handleDeleteProducer(prod.ID)}>Xóa</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                {Array.from({ length: Math.ceil(producers.length / itemsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>


            <div className="add-category">
                <input
                    type="text"
                    placeholder="Nhập tên nhà sản xuất"
                    value={newProducerName}
                    onChange={(e) => setNewProducerName(e.target.value)}
                />
                <button onClick={handleAddProducer} disabled={!newProducerName.trim()}>
                    Thêm nhà sản xuất
                </button>
            </div>
        </div>
    );
};

export default Producer;
