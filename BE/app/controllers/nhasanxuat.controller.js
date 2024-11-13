const db = require("../models");
const NhaSanXuat = db.nhasanxuat;

// Thêm nhà sản xuất mới
exports.create = async (req, res) => {
    try {
        const { ten_nSX } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!ten_nSX) {
            return res.status(400).send({ message: "Tên nhà sản xuất là bắt buộc." });
        }

        // Tạo mới nhà sản xuất
        const newNhaSanXuat = await NhaSanXuat.create({ ten_nSX });
        res.status(201).send({ message: "Thêm nhà sản xuất thành công.", data: newNhaSanXuat });
    } catch (error) {
        console.error("Lỗi trong quá trình thêm nhà sản xuất:", error);
        res.status(500).send({ message: "Có lỗi xảy ra trong quá trình thêm nhà sản xuất." });
    }
};

// Sửa thông tin nhà sản xuất
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { ten_nSX } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!ten_nSX) {
            return res.status(400).send({ message: "Tên nhà sản xuất là bắt buộc." });
        }

        // Cập nhật nhà sản xuất
        const result = await NhaSanXuat.update({ ten_nSX }, { where: { ID: id } });
        if (result[0] === 0) {
            return res.status(404).send({ message: "Không tìm thấy nhà sản xuất để cập nhật." });
        }

        res.status(200).send({ message: "Cập nhật nhà sản xuất thành công." });
    } catch (error) {
        console.error("Lỗi trong quá trình cập nhật nhà sản xuất:", error);
        res.status(500).send({ message: "Có lỗi xảy ra trong quá trình cập nhật nhà sản xuất." });
    }
};

// Xóa nhà sản xuất
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        // Xóa nhà sản xuất
        const result = await NhaSanXuat.destroy({ where: { ID: id } });
        if (result === 0) {
            return res.status(404).send({ message: "Không tìm thấy nhà sản xuất để xóa." });
        }

        res.status(200).send({ message: "Xóa nhà sản xuất thành công." });
    } catch (error) {
        console.error("Lỗi trong quá trình xóa nhà sản xuất:", error);
        res.status(500).send({ message: "Có lỗi xảy ra trong quá trình xóa nhà sản xuất." });
    }
};

// Tìm nhà sản xuất theo tên
exports.findByName = async (req, res) => {
    try {
        const { name } = req.params;

        // Tìm nhà sản xuất theo tên
        const data = await NhaSanXuat.findAll({ where: { ten_nSX: { [db.Sequelize.Op.like]: `%${name}%` } } });
        if (data.length === 0) {
            return res.status(404).send({ message: "Không tìm thấy nhà sản xuất theo tên đã cung cấp." });
        }

        res.status(200).send(data);
    } catch (error) {
        console.error("Lỗi trong quá trình tìm nhà sản xuất theo tên:", error);
        res.status(500).send({ message: "Có lỗi xảy ra trong quá trình tìm nhà sản xuất." });
    }
};

// Lấy tất cả danh mục
exports.findAll = async (req, res) => {
    try {
        const nsx = await NhaSanXuat.findAll();
        res.status(200).send(nsx);
    } catch (error) {
        console.error("Lỗi trong quá trình lấy tất cả NSX:", error);
        res
            .status(500)
            .send({ message: "Có lỗi xảy ra trong quá trình lấy tất cả NSX." });
    }
};

// Lấy danh mục theo ID
exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const nsx = await NhaSanXuat.findByPk(id);
        if (nsx) {
            res.status(200).send(nsx);
        } else {
            res
                .status(404)
                .send({ message: `Không tìm thấy NSX với ID=${id}.` });
        }
    } catch (error) {
        console.error("Lỗi trong quá trình lấy NSX theo ID:", error);
        res
            .status(500)
            .send({ message: "Có lỗi xảy ra trong quá trình lấy NSX." });
    }
};
