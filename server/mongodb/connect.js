import mongoose from "mongoose";

const connecDB = (url) => {
  mongoose.set("strictQuery", true);

  // try {
  mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected"))
    .catch((e) => console.log("ERROR in connected DB" + e));
  //   console.log("MongoDB connected");
  // } catch (error) {
  //   console.log("ERROR in connected DB" + error);
  // }
};
export default connecDB;
