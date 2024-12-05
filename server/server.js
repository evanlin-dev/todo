import cors from 'cors';
import express from 'express';
import tasks from './routes/task.js';

const app = express();
const PORT = process.env.PORT || 5050;

const frontendUrl = "https://todo-git-main-evanlindevs-projects.vercel.app";

app.use(cors({
  origin: frontendUrl,
  methods: "GET,POST,PATCH,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));

app.use(express.json());
app.use("/task", tasks);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
