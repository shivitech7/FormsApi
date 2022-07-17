import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    path: {
        type: String
    }
})

const createdocument = new mongoose.model("Documents", documentSchema);

export default createdocument;