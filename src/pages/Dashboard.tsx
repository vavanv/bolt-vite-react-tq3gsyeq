import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from '@mui/material';
import { Users, Calendar, MessageSquare } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function Dashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  const stats = [
    {
      title: 'Total Events',
      value: '12',
      icon: <Calendar />,
      color: '#1976d2',
    },
    {
      title: 'Active Speakers',
      value: '24',
      icon: <Users />,
      color: '#2e7d32',
    },
    {
      title: 'Questions Asked',
      value: '156',
      icon: <MessageSquare />,
      color: '#ed6c02',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.name}!
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={4} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      bgcolor: stat.color,
                      borderRadius: '50%',
                      p: 1,
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography color="textSecondary" gutterBottom>
                      {stat.title}
                    </Typography>
                    <Typography variant="h4">{stat.value}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}