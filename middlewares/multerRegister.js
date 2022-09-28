const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './public/images/users');
	},
	filename: (req, file, cb) => {
		let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
		cb(null, fileName);
	},
});

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
