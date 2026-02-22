import express, { Request, Response } from 'express';
import cors from 'cors';
import routeLLM from './src/routes/routeLLM';

const app = express();
const port = 3000;

app.use(cors()); // Autorise toutes les origines (nécesaire pour que le frontend Vite parle au backend)
app.use(express.json());
app.use('/LLM', routeLLM);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});