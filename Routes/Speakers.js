import express from "express";
import speakerModel from "../Models/Speakers.js";
import eventModel from "../Models/Events.js";

const router = express.Router();

//CURD OPERATIONS FOR speakers DATABASE

//Read speakers data
router.get("/", async (req, res) => {
    try {
        const speakers = await speakerModel.find({});
        res.status(200).send(speakers);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = (req.params.id).toString();
        console.log(id);
        const speaker = await speakerModel.findById(id);
        res.status(200).send(speaker);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const speaker = new speakerModel(req.body);
        const save_speaker = await speaker.save();
        console.log(save_speaker);
        res.status(200).send(save_speaker);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const event = await speakerModel.updateOne({ _id: `${id}` }, req.body);
        res.send(event);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { eventId } = req.query;
        eventModel.findOneAndUpdate({ _id: eventId }, {
            $pull: {
                'speaker': req.params.id
            }
        }, function (err) {
            if (!err) {
                speakerModel.findByIdAndRemove({ _id: req.params.id }, (err) => {
                    if (err) res.json(err)
                    else res.json('Succesfully removed');
                });
            }
            else {
                res.status(500).json(err)
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});

export default router;