import { app } from "./app.js";
import { connection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cors from "cors";
import itemRoutes from './routes/itemRouter.js';

app.use("/api/v1", itemRoutes);


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


config({ path: "./config.env" });

connection();

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port http://localhost:${process.env.PORT}`);
});