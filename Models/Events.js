import mongoose from "mongoose";
// import {createSpeaker} from './Speakers.js';
// const Speakers = require('./Speakers');



const speakerSchema = new mongoose.Schema({
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
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    registration_link: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
    time: {
        from: {
            type: String
        },
        to: {
            type: String
        }
    },
    about: {
        type: String
    },
    speaker: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speakers'
    }],
    moderator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Moderators'
    }],
    reading_material: {
        type: String
    },
    organisers: [{
        type: String
    }],
    tags: [{
        type: String
    }]
})

const createEvent = new mongoose.model("Events", eventSchema);

export default createEvent;