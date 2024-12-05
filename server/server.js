import express from 'express';
import cors from 'cors';
import tasks from './routes/task.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use("/task", tasks);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
