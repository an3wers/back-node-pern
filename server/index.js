import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./db.js";
import * as models from "./db_models/model.js";
import cors from "cors";
import router from "./routes/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import fileUpload from "express-fileupload";
import path from 'path'

const __dirname = path.resolve();
const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}));

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Server is working!" });
// });

app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync();

    app.listen(port, () =>
      console.log(`Server is started on http://localhost:${port} `)
    );
  } catch (error) {
    console.error(error);
  }
};

start();

