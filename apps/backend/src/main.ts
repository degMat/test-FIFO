import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import typeActionRoutes from "./routes/typeActionRoutes";
import actionRoutes from "./routes/actionRoutes";
import startQueue from "./queue";
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
const prisma = new PrismaClient();

const corsOptions = {
  origin: 'http://localhost:4200', // L'origine de votre frontend
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

//routes
app.use('/api/typeActions', typeActionRoutes);
app.use('/api/actions', actionRoutes);

prisma.$connect().then(() => {
  console.log("Data Source has been initialized!");
  startQueue().then();
}).catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
