import * as mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URL!)
    .then((conn: any) => {
      console.log(`database connected : ${conn.connection.host}`);
    })
    .catch((err: Error) => {
      console.error(`Database error : ${err}`);
      process.exit(1);
    });
};

export default dbConnection;
