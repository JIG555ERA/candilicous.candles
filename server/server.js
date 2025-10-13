// index.js
import express from "express";
import cors from "cors";
import paymentRouter from "./routers/paymentRouter.js";

const app = express();
app.use(express.json())
app.use(cors())

app.use("/miv/payments", paymentRouter);

export default app;
// app.listen(5000, () => {
//     console.log(`server is running on http://localhost:5000/`)
// })