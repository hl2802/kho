import React, { useState } from "react";
import "./css/Reports.css";
import { formatter } from "../components/fomater.jsx";

const Reports = () => {
    const [reports, setReports] = useState([

    ]);

    const [sortOrder, setSortOrder] = useState("newest");

    const toggleSortOrder = () => {
        const newOrder = sortOrder === "newest" ? "oldest" : "newest";
        setSortOrder(newOrder);
        setReports((prevReports) =>
            [...prevReports].sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return newOrder === "newest" ? dateB - dateA : dateA - dateB;
            })
        );
    };


    return (
        <div className="create-report-detail">
            <h1>Danh sách báo cáo</h1>

            <button onClick={toggleSortOrder}>
                Sắp xếp theo: {sortOrder === "newest" ? "Thời gian mới nhất" : "Thời gian cũ nhất"}
            </button>

            <div className="report-list">
                <table>
                    <thead>
                        <tr>
                            <th>Hoạt động</th>
                            <th>Loại mặt hàng</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền hàng hóa</th>
                            <th>Người thực hiện</th>
                            <th>Thời gian thực hiện</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report, index) => (
                            <tr key={index}>
                                <td>{report.activity}</td>
                                <td>{report.itemType}</td>
                                <td>{report.quantity}</td>
                                <td>{formatter.format(report.totalValue)}</td>
                                <td>{report.user}</td>
                                <td>{new Date(report.date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Reports;
