import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Fingerprint from "express-fingerprint";
import TokenService from "./services/Token.js";
import cookieParser from "cookie-parser";

import clothesRouter from "./routes/clothes.routes.js";
import AuthRouter from "./routes/auth.routes.js";

// const userRouter = require("./routes/user.routes");
// const postRouter = require("./routes/post.routes");
// const clothesRouter = require("./routes/clothes.routes");

const allowedOrigins = ["http://localhost:5173"];

// const corsOptions = {
//   credentials: true,
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

dotenv.config();

const PORT = process.env.PORT || 5000;
const url = process.env.POSTGRES_URL;
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

// app.use("/api", userRouter);
// app.use("/api", postRouter);
app.use("/api", clothesRouter);
app.use("/auth", AuthRouter);

// app.listen(process.env.PORT, () =>
//   console.log(`server started, port: ${PORT}`)
// );

app.listen(PORT, () => console.log(`server started, port: ${PORT}`));
