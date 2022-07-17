import mongoose from "mongoose";

mongoose
.connect("mongodb+srv://ShivaniAgarwal:qwerty987@ooloiapi.wqsj5.mongodb.net/Ooloiapi?retryWrites=true&w=majority")
  // .connect("mongodb://localhost:27017/ooloiapi")
  .then(() => {
    console.log("Connected to database.");
  })
  .catch((err) => {
    console.log("Database connection failed",err);
  });
