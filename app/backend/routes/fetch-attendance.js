const express = require('express');
const routes = express.Router();
const attendance = require('../../backend/students/attendance/attendanceHelper.js')

routes.post('/', async (req, res) => {
    // Student Details
    const class_name = req.body.className;
    try {
        const result = await attendance.fetchAttendanceData(class_name);
        res.status(200).json({
            success: true,
            message: "Attendance data fetched successfully",
            data: result
        });
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