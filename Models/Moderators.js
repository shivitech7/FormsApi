import mongoose from "mongoose";

const moderatorSchema = new mongoose.Schema({
    name: {
        type: String
    },
    about: {
        type: String
    },
    image: {
        type: String
    }
})

const createModerator = new mongoose.model("Moderators", moderatorSchema)

export default createModerator;