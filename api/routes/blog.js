const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Blog = require('../models/blog');

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        cb(null, formattedDate + file.originalname);
    },
});

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits,
});

router.get('/', async (req, res) => {
    try {
        const response = await Blog.find();
        console.log(response);
        res.status(200).json({  
            data:response,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({  
            status: 500,
            error: err,
        });
    }
});

router.post('/', upload.single('blogImage'), async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    const id = new mongoose.Types.ObjectId();
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const blog = new Blog({
        _id: id,
        blogTitle: req.body.title,
        blogAuthor: req.body.author,
        blogDesc: req.body.description,
        blogDate: formattedDate,
        blogImage: req.file.path.replace('\\','/'),
        url: req.body.url
    });

    try {
        const response = await blog.save();
        console.log(response);
        res.status(200).json({  
            status: 200,
            response,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({  
            status: 500,
            error: err,
        });
    }
});

module.exports = router;
