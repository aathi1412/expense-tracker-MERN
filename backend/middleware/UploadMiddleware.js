import multer, { diskStorage } from "multer";
const path = require("path");
const fs = require("fs");


const uploads = path.join(process.cwd(), "uploads");

if (!fs.existsSync(uploads)) {
    fs.mkdirSync(uploads, { recursive: true });
}

const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"), false);
    }
};

const upload = multer({
    storage,
    fileFilter
});

export default upload;