import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import clothesRouter from "./routes/clothes.routes.js";
import AuthRouter from "./routes/auth.routes.js";
import CartRouter from "./routes/cart.routes.js";
import TokenService from "./services/Token.js";

// const allowedOrigins = ["http://localhost:5173"];

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
const app = express();
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

app.use("/api", clothesRouter);
app.use("/auth", AuthRouter);
app.use("/cart", CartRouter);
app.get("/user", TokenService.checkAccess, (_, res) => {
  return res.status(200).json("Добро пожаловать!" + Date.now());
});

app.listen(process.env.PORT, () =>
  console.log(`server started, port: ${PORT}`)
);
