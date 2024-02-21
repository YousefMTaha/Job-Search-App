import mongoose from "mongoose";

export const dbConnection = async () => {
  await mongoose
    .connect(process.env.dbUrl)
    .then(() => {
      console.log(`db connected in ${process.env.dbUrl}`);
    })
    .catch((err) => {
      console.log({ msg: "fail connect to db", err });
    });
};
