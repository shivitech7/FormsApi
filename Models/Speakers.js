import mongoose from "mongoose";

const speakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

 const createSpeaker = new mongoose.model("Speakers", speakerSchema);

export default createSpeaker;