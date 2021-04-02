 const multer = require('multer');
 const express =require('express');
const isAuth = require('../../utils');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });

 let routes = (app) => {
     app.post('/uploads', isAuth, upload.single('image'), (req, res) => {
         res.send(`/${req.file.path}`);
     });

 };

 module.exports = routes

