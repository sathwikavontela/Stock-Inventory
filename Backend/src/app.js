<<<<<<< HEAD
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import requestRouter from "./routes/request.routes.js";
import returnRouter from "./routes/return.routes.js";
import authorityRouter from "./routes/authority.routes.js";
import ficRouter from "./routes/fic.routes.js";
const app = express(); /// see meaning of this line
=======
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import requestRouter from './routes/request.routes.js'
import returnRouter from './routes/return.routes.js'
import authorityRouter from './routes/authority.routes.js'
import ficRouter from './routes/fic.routes.js'

const app = express() /// see meaning of this line
>>>>>>> 9fde77e1df59cc2fa8aafb44ffb026dbb8f2b02a

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};

<<<<<<< HEAD
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/returns", returnRouter);
app.use("/api/v1/authority", authorityRouter);
app.use("/api/v1/fic", ficRouter);
export default app;
=======
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/requests', requestRouter)
app.use('/api/v1/returns', returnRouter)
app.use('/api/v1/authority', authorityRouter)
app.use('/api/v1/fic', ficRouter)

export default app
>>>>>>> 9fde77e1df59cc2fa8aafb44ffb026dbb8f2b02a
