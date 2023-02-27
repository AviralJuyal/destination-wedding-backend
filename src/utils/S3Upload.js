const multer = require("multer");
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const s3 = new AWS.S3({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
  })


  const videoUpload = multer({
   
    // storage: videoStorage,
    limits: {
    fileSize: 50000000 // 10000000 Bytes = 50 MB
    },
    fileFilter(req, file, cb) {
        console.log('dj')
    cb(undefined, true)
}
})



exports.uploadToS3 = async (fileData,fileName, folder) =>{

    // console.log("FILEDATA", fileData);
let fileType = fileData.mimetype.split('/')[1]
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: `${folder}/${fileName}.${fileType}`,
    Body: fileData.buffer,
  }

let videoUrl=""
s3.upload(params, (err, data) => {
    if (err) {
      console.log(err);
    }
    console.log(data.Location);
    videoUrl = data.Location;
    // resolve(data.Location)
  })
    return videoUrl
}