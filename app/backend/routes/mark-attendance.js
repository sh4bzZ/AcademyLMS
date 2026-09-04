const express = require('express');
const routes = express.Router();
const attendance = require('../../backend/students/attendance/attendanceHelper.js')

const express = require('express');
const routes = express.Router();

const attendance = require('../../backend/students/attendance/attendanceHelper.js');


// + Add: Handle attendance submission.
routes.post('/mark-attendance', async (req, res) => {

    try {

        // + Read JSON sent by the frontend.
        const { class_id, attendance: attendanceList } = req.body;

        // + Make sure attendance is an array.
        if (!Array.isArray(attendanceList)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid attendance data.'
            });
        }

        // + Make sure a class was provided.
        if (!class_id) {
            return res.status(400).json({
                success: false,
                message: 'Class ID is required.'
            });
        }

        // + Get today's date in YYYY-MM-DD format.
        const date = new Date().toISOString().split('T')[0];

        // + Process every student's attendance.
        for (const record of attendanceList) {

            // + Validate the attendance status.
            if (!['present', 'absent'].includes(record.status)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid attendance status.'
                });
            }

            // + Make sure the student ID and name exist.
            if (!record.student_id || !record.student_name) {
                return res.status(400).json({
                    success: false,
                    message: 'Student ID and student name are required.'
                });
            }

            // + Insert this student's attendance into the database.
            await attendance.markAttendance(
                record.student_id,
                record.student_name,
                record.status,
                date
            );
        }

        // + Tell the client that everything was successful.
        return res.status(200).json({
            success: true,
            message: 'Attendance submitted successfully.'
        });

    } catch (error) {

        console.error(
            'Error submitting attendance:',
            error
        );

        return res.status(500).json({
            success: false,
            message: 'Failed to submit attendance.'
        });
    }
});

module.exports = { routes };