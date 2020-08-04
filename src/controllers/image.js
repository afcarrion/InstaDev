const { randomName } = require('../helpers/libs');
const { Image } = require('../models/index');
const path = require('path');
const fs = require('fs-extra');
const ctrl = {};

ctrl.index = (req, res) => {

};

ctrl.create = (req, res) => {
    //console.log(req.file);

    const saveImage = async () => {
        const nameImage = randomName();
        const images = await Image.find({filename: nameImage});
        if(images.length > 0){
            saveImage();
        } else {
            //console.log(nameImage);
            const ext = path.extname(req.file.originalname).toLowerCase();
            const imageTempPath = req.file.path
            const targetPath = path.resolve(`src/public/upload/${nameImage}${ext}`)
            //console.log(targetPath);
            if(ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
                await fs.rename(imageTempPath, targetPath);
                const newImage = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: nameImage + ext,
                });
                const imageSave = await newImage.save();
                console.log(newImage);
               // res.redirect('/images');
               res.send('Todo bien ');
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({error: 'Only images'})
            }
        }
    }
    saveImage();
};

ctrl.like = (req, res) => {
    
};

ctrl.comment = (req, res) => {
    
};

ctrl.delete = (req, res) => {
    
};

module.exports = ctrl;