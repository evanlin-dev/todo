import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography } from '@mui/material';

export default function Task() {
  const [form, setForm] = useState({
    name: "",
    date: "", 
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      const response = await fetch(`http://localhost:5050/task/${params.id}`);
      if (!response.ok) {
        console.error(`An error occurred: ${response.statusText}`);
        return;
      }
      const task = await response.json();
      if (!task) {
        console.warn(`task with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(task);
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    setForm((prev) => ({ ...prev, ...value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    const task = { ...form };
    try {
      const response = await fetch(`http://localhost:5050/task${params.id ? "/" + params.id : ""}`, {
        method: `${params.id ? "PATCH" : "POST"}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: "", date: "" });
      navigate("/");
    }
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        {params.id ? "Edit Task" : "Create Task"}
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="Task Name"
          variant="outlined"
          fullWidth
          value={form.name}
          onChange={(e) => updateForm({ name: e.target.value })}
          margin="normal"
        />
        <TextField
          type="date"
          variant="outlined"
          fullWidth
          value={form.date}
          onChange={(e) => updateForm({ date: e.target.value })}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Save Task
        </Button>
      </form>
    </Container>
  );
}
