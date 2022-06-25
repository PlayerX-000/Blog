const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imagensPosts/')
    },
    filename: function (req, file, cb) {
        // Indica o novo nome do arquivo:
        cb(null, file.originalname)
    }
});

exports.upload = multer({ storage:storage });
