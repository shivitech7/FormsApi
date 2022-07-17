import multer from "multer";
import express from "express";
import path from "path";
import documentModel from "../Models/Documents.js";
const router = express.Router();

// console.log('path: ', path);
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage });

router.post("/", upload.single("document"), async (req, res) => {
    console.log(req.file);
    const filePath = req.file.path;
    const json = {
        "url": `${req.protocol}://${req.get("host")}/${filePath}`
    }
    const data = {
        "path": filePath
    }
    const document = new documentModel(data);
    console.log(document);
    const save_document = await document.save();
    res.status(200).send(json);
})

export default router;