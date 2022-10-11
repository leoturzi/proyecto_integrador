const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'public/images/products');
    },
    filename : (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    }
})

const uploadFile = multer({
	storage: storage,
	fileFilter: (req, file, cb) => {
		const fileData = file;
		const validExt = ['.jpg', '.png', '.jpeg'];

		if (fileData) {
			const fileExt = path.extname(fileData.originalname);
			if (!validExt.includes(fileExt)) {
				cb(null, false);
			} else {
				cb(null, true);
			}
		}
	},
});

module.exports = uploadFile;
