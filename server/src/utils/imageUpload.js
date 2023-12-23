// utils/imageUpload.js

const fs = require('fs');
const multer = require('multer');
const {ObjectId} = require('mongodb');

// Function to generate a random number between 1 and 9999
const generateRandomNumber = () => {
    return Math.floor(Math.random() * 9999) + 1;
};

// Multer configuration for file upload
const imageStorage = (folderPrefix, fieldName, useObjectId = false) => multer.diskStorage({
    destination: (req, file, cb) => {
        const id = useObjectId ? new ObjectId() : req.params.userId;
        const folderPath = `uploads/${folderPrefix}/${id}/${fieldName}/`;

        // Create the folder if it doesn't exist
        fs.promises.mkdir(folderPath, {recursive: true})
            .then(() => {
                req.id = id; // Attach the id to the request object for later use
                cb(null, folderPath);
            })
            .catch((err) => {
                cb(err, null);
            });
    },
    filename: (req, file, cb) => {
        const randomPrefix = generateRandomNumber();
        const originalName = file.originalname.replace(/\s+/g, '');
        const modifiedFileName = `${randomPrefix}_${originalName}`;
        cb(null, modifiedFileName);
    },
});

const imageUpload = (folderPrefix, fieldName, useObjectId = false) =>
    multer({storage: imageStorage(folderPrefix, fieldName, useObjectId)}).single(fieldName);

module.exports = {
    imageUpload,
    generateRandomNumber,
};
