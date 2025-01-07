import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Tab,
  Tabs,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Auth() {
  const [tab, setTab] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    setUser({
      id: '1',
      email,
      role: 'admin',
      name: 'Admin User',
    });
    navigate('/');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', mx: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Conference Manager
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered>
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </TabPanel>
        </CardContent>
      </Card>
    </Box>
  );
}