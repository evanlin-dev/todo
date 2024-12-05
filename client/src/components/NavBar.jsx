import { NavLink } from "react-router-dom";
import { Button, AppBar, Toolbar, Typography, Box } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ background: "transparent", boxShadow: "none" }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '1.5rem', color: "black" }}>
          Task Manager
        </Typography>
        
        <NavLink to="/create" style={{ textDecoration: 'none' }}>
          <Button
            color="primary"
            sx={{
              backgroundColor: "#4CAF50",
              '&:hover': {
                backgroundColor: "#388E3C",
              },
              padding: "8px 16px",
              borderRadius: "25px",
              fontSize: "1rem",
              fontWeight: "bold",
              textTransform: "none",
              color: "white"
            }}
          >
            New Task
          </Button>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
