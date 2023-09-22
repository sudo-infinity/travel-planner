const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdir('./uploads/', () => {
      cb(null, './uploads/');
    });
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/; // Add more allowed file types if needed
  const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedFileTypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb('Error: Images only!');
};

const upload = multer({ dest: 'uploads', storage, fileFilter }).array('images', 10);

module.exports = upload;
