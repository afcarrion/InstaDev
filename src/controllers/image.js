const { randomName } = require('../helpers/libs');
const path = require('path');
const fs = require('fs-extra');
const ctrl = {};

ctrl.index = (req, res) => {

};

ctrl.create = async (req, res) => {
    //console.log(req.file);
    const nameImage = randomName();
    //console.log(nameImage);
    const ext = path.extname(req.file.originalname).toLowerCase();
    const imageTempPath = req.file.path
    const targetPath = path.resolve(`src/public/upload/${nameImage}${ext}`)
    //console.log(targetPath);
    if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        await fs.rename(imageTempPath, targetPath);
    }
    res.send('It works');
};

ctrl.like = (req, res) => {
    
};

ctrl.comment = (req, res) => {
    
};

ctrl.delete = (req, res) => {
    
};

module.exports = ctrl;