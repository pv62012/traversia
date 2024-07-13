import { MongooseError } from "mongoose";
import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose.set("strictQuery", true);
  const uri = process.env.MONGO_URL || '';
  mongoose
    .connect(uri, {})
    .then(() => {
      console.log("connected");
    })
    .catch((err: MongooseError) => {
      console.log(err);
    });
};

export default connectDatabase;
