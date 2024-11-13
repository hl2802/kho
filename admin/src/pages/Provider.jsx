// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./css/Provider.css";

// const Providers = () => {
//     const [providerData, setProviderData] = useState([]);
//     const [editIndex, setEditIndex] = useState(null);
//     const [isAdding, setIsAdding] = useState(false);
//     const [showModal, setShowModal] = useState(false); // Modal state
//     const [editForm, setEditForm] = useState({
//         ma_NCC: "",
//         ten_NCC: "",
//         so_Dien_Thoai: "",
//         dia_Chi: "",
//     });

//     useEffect(() => {
//         fetchProviders();
//     }, []);

//     const fetchProviders = async () => {
//         try {
//             const response = await axios.get("http://localhost:8000/api/nhacungcap");
//             setProviderData(response.data);
//         } catch (error) {
//             console.error("Error fetching provider data", error);
//         }
//     };

//     const handleEdit = (index) => {
//         setEditIndex(index);
//         setIsAdding(false);
//         setEditForm(providerData[index]);
//         setShowModal(true); // Show modal
//     };

//     const handleDelete = (index) => {
//         const updatedData = providerData.filter((_, i) => i !== index);
//         setProviderData(updatedData);
//     };

//     const handleCancel = () => {
//         setEditIndex(null);
//         setIsAdding(false);
//         setShowModal(false); // Close modal
//         setEditForm({
//             ma_NCC: "",
//             ten_NCC: "",
//             so_Dien_Thoai: "",
//             dia_Chi: "",
//         });
//     };

//     const handleFormChange = (e) => {
//         const { name, value } = e.target;
//         setEditForm({ ...editForm, [name]: value });
//     };

//     const handleSave = async () => {
//         if (isAdding) {
//             try {
//                 const response = await axios.post("http://localhost:8000/api/nhacungcap", editForm);
//                 setProviderData([...providerData, response.data.data]); // Add the newly created provider
//             } catch (error) {
//                 console.error("Error saving provider", error);
//             }
//         } else {
//             const updatedData = providerData.map((item, index) =>
//                 index === editIndex ? editForm : item
//             );
//             setProviderData(updatedData);
//         }
//         handleCancel();
//     };

//     const handleAddProvider = () => {
//         setIsAdding(true);
//         setEditIndex(null);
//         setShowModal(true); // Show modal
//         setEditForm({
//             ma_NCC: "",
//             ten_NCC: "",
//             so_Dien_Thoai: "",
//             dia_Chi: "",
//         });
//     };

//     return (
//         <div className="provider-page">
//             <div className="search-filter-section">
//                 <input type="text" placeholder="Nhập tên hoặc mã nhà cung cấp để tìm kiếm" className="search-input" />
//                 <button className="filter-button">Xem</button>
//                 <button className="filter-button" onClick={handleAddProvider}>Thêm nhà cung cấp</button>
//             </div>

//             {showModal && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <button className="close" onClick={handleCancel}>&times;</button>
//                         <h2>{isAdding ? "Thêm nhà cung cấp mới" : "Chỉnh sửa nhà cung cấp"}</h2>
//                         <input type="text" name="ma_NCC" placeholder="Mã nhà cung cấp" value={editForm.ma_NCC} onChange={handleFormChange} />
//                         <input type="text" name="ten_NCC" placeholder="Tên nhà cung cấp" value={editForm.ten_NCC} onChange={handleFormChange} />
//                         <input type="text" name="so_Dien_Thoai" placeholder="Số điện thoại" value={editForm.so_Dien_Thoai} onChange={handleFormChange} />
//                         <input type="text" name="dia_Chi" placeholder="Địa chỉ" value={editForm.dia_Chi} onChange={handleFormChange} />
//                         <button onClick={handleSave}>Lưu</button>
//                         <button onClick={handleCancel}>Hủy</button>
//                     </div>
//                 </div>
//             )}


//             <table className="provider-table">
//                 <thead>
//                     <tr>
//                         <th>Mã nhà cung cấp</th>
//                         <th>Tên nhà cung cấp</th>
//                         <th>Số điện thoại</th>
//                         <th>Địa chỉ</th>
//                         <th>Hành động</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {providerData.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.ma_NCC}</td>
//                             <td>{item.ten_NCC}</td>
//                             <td>{item.so_Dien_Thoai}</td>
//                             <td>{item.dia_Chi}</td>
//                             <td>
//                                 <button className="btn_edit" onClick={() => handleEdit(index)}>Sửa</button>
//                                 <button className="btn_delete" onClick={() => handleDelete(index)}>Xóa</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Providers;
