import express from "express";
import moderatorModel from "../Models/Moderators.js";
import eventModel from "../Models/Events.js";

const router = express.Router();

//CURD OPERATIONS FOR moderators DATABASE

//Read moderators data
router.get("/", async (req, res) => {
    try {
        const Moderators = await moderatorModel.find({});
        res.status(200).send(Moderators);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = (req.params.id).toString();
        const moderator = await moderatorModel.findById(id);
        res.status(200).send(moderator);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const moderator = new moderatorModel(req.body);
        const save_moderator = await moderator.save();
        console.log(save_moderator);
        res.status(200).send(save_moderator);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const event = await moderatorModel.updateOne({ _id: `${id}` }, req.body);
        res.status(200).send(event);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        console.log(req.query);
        const { eventId } = req.query;
        eventModel.findOneAndUpdate({ _id: eventId }, {
            $pull: {
                'moderator': req.params.id
            }
        }, function (err) {
            if (!err) {
                moderatorModel.findByIdAndRemove({ _id: req.params.id }, (err) => {
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