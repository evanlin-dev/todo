import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Task = (props) => (
  <TableRow hover>
    <TableCell>{props.task.name}</TableCell>
    <TableCell>{props.task.date}</TableCell>
    <TableCell>
      <Button 
        variant="contained" 
        color="primary" 
        component={Link} 
        to={`/edit/${props.task._id}`}
        sx={{ marginRight: 1 }}
      >
        Edit
      </Button>
      <Button 
        variant="contained" 
        color="secondary" 
        onClick={() => props.deletetask(props.task._id)}
      >
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`http://localhost:5050/task/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const tasks = await response.json();
      setTasks(tasks);
    }
    getTasks();
  }, []);

  async function deleteTask(id) {
    await fetch(`http://localhost:5050/task/${id}`, {
      method: "DELETE",
    });
    const response = await fetch(`http://localhost:5050/task/`);
    const updatedTasks = await response.json();
    setTasks(updatedTasks);
  }
  function TaskList() {
    return tasks.map((task) => (
      <Task
        task={task}
        deletetask={() => deleteTask(task._id)}
        key={task._id}
      />
    ));
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Task List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {TaskList()}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
