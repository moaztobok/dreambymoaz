const Project = require('../models/project')
const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();
router.post('/',async (req,res)=>{
    //const { clientName, projectDetails, clientEmail } = req.body;
    const id = new mongoose.Types.ObjectId();

    const project = new Project({
        _id:id,
        clientName : req.body.clientName,
        projectDetails : req.body.projectDetails,
        clientEmail : req.body.clientEmail,
    });
    try{
        const response =await project.save();
        res.status(201).json({
            status : 201,
            message : 'Project Added Successfully',
            data : response
        });
    }catch(err){
        res.status(500).json({status : 500 , message : err.message})
    }
})
router.get('/',async (req,res)=>{
        res.status(200).json({status : 200, message : 'Looking for projects'})
})
module.exports =router