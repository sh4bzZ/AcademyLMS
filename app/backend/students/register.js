const express=require('express');
const mysql = require('mysql');
const dbConnector = require("../sql/connectDb.js") 

function registerStudent(
    name, age, id, class, math, math_fees, physics, physics_fees, english, english_fees,
    bio, bio_fees, chemistry, chemistry_fees, urdu, urdu_fees, quran, quran_fees
){
    connection=dbConnector.connectToDatabase();
}