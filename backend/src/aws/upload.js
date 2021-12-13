const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3Config = new aws.S3({
  secretAccessKey: process.env.S3_ACCESS_SECRET, 
  accessKeyId: process.env.S3_ACCESS_KEY, 
  region: 'us-west-1',
  Bucket: process.env.S3_BUCKET_NAME,
}); 

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
  }
};

const multerS3Config = multerS3({
  s3: s3Config, 
  bucket: process.env.S3_BUCKET_NAME,
  metadata: (req, file, cb) => {
    cb(null, { fieldName: file.fieldName })
  },
  key: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname)
  },
})

const upload = multer({
  storage: multerS3Config, 
  limits: {
    fileSize: 1024 * 1024 * 5,
  }
})

module.exports = { upload }