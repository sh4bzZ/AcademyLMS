const express = require('express');
const routes = express.Router();
const students = require('../admin/admin/adminHelper.js')

routes.post('/', async (req, res) => {
    try {
        const result = await students.viewRegisteredStudents();
        res.status(200).json({
            success: true,
            message: "Student data fetched successfully",
            data: result
        });
        console.log(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

module.exports = { routes };