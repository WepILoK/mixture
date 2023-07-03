import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import './src/core/db.ts';
import router from "./src/routes";

const app = express()
const PORT = process.env.PORT || 8888

dotenv.config()
app.use(express.json())
app.use(cors())

app.use("/api", router);

app.listen(PORT, () => {
        console.log('Server start')
})