const express = require('express');
const routes = express.Router();
const students = require('../admin/admin/adminHelper.js')

routes.post('/', async (req, res) => {
    const date = req.body.date;
    const class_name = req.body.class_name;
    try {
        const result = await students.viewAttendance(date, class_name);
        res.status(200).json({
            success: true,
            message: "Attendance data fetched successfully",
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