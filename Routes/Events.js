import express from "express";
import eventModel from "../Models/Events.js";

const router = express.Router();

//CURD OPERATIONS FOR events DATABASE

//Read events data
router.get("/", async (req, res) => {
    try {
        const events = await eventModel.find({}).populate('speaker').populate('moderator');
        res.status(200).send(events);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = (req.params.id).toString();
        const event = await eventModel.findById(id).populate('speaker').populate('moderator');
        res.status(200).send(event);
    } catch (err) {
        res.status(400).send(err);
    }
});

// const createEvent = function (eventData) {
//     return eventModel.create(eventData).then(docEvent => {
//         console.log("\n>> Created event:\n", docEvent);
//         return docEvent;
//     });
// };
router.post("/", async (req, res) => {
    try {
        console.log(req.body);

        const eventData = {
            "title": req.body.title,
            "speaker": req.body.speaker,
            "registration_link": req.body.registration_link,
            "date": req.body.date,
            "time": req.body.time,
            "about": req.body.about,
            "moderator": req.body.moderator,
            "reading_material": req.body.reading_material,
            "organisers": req.body.organisers,
            "tags": req.body.tags
        }
        const event = await new eventModel(eventData);
        console.log(`Event: ${event}`)
        const event_save = await event.save();
        res.status(200).send(event_save);
    } catch (err) {
        res.status(400).send(`err: ${err}`);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventModel.updateOne({ _id: `${id}`}, req.body);
        res.send(event);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventModel.deleteOne({ _id: `${id}` });
        res.status(200).send(event);
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;