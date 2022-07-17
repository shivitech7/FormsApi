import  express  from "express";
import "./Database/connection.js";
import eventRoutes from "./Routes/Events.js";
import documentRoutes from "./Routes/Documents.js";
import speakerRoutes from "./Routes/Speakers.js";
import moderatorRoutes from "./Routes/Moderators.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send("Hello from server!");
});

app.use("/events", eventRoutes);
app.use("/speakers", speakerRoutes);
app.use("/moderators", moderatorRoutes);
app.use("/documents", documentRoutes);
app.use("/uploads", express.static('uploads'));

app.listen(PORT, () => console.log(`Server initialized at ${PORT}`));