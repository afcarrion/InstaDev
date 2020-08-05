const { randomName } = require('../helpers/libs');
const { Image } = require('../models/index');
const { Comment } = require('../models/index');
const md5 = require('md5');
const path = require('path');
const fs = require('fs-extra');
const ctrl = {};

ctrl.index = async (req, res) => {
    //console.log(req.params.image_id);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    //console.log(image);
    res.render('images', { image });
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
                res.redirect('/images/' + nameImage);
               //res.send('Todo bien ');
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

ctrl.comment = async (req, res) => {
    //console.log(req.body);
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        console.log(newComment);
        await newComment.save();
        res.redirect(`/images/${image.uniqueId}`);
    }
};

ctrl.delete = (req, res) => {
    
};

module.exports = ctrl;