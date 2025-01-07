import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { format } from 'date-fns';
import { mockEvents, mockSpeakers } from '../store/mockData';

export default function EventList() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Events</Typography>
        <Button variant="contained" color="primary">
          Add Event
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {mockEvents.map((event) => {
          const speaker = mockSpeakers.find(s => s.id === event.speaker_id);
          return (
            <Grid item xs={12} key={event.id}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {format(new Date(event.start_time), 'PPP p')} - {format(new Date(event.end_time), 'p')}
                  </Typography>
                  <Typography paragraph>
                    {event.description}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Chip 
                      label={`Speaker: ${speaker?.expertise[0]}`}
                      color="primary"
                      variant="outlined"
                    />
                    <Chip 
                      label={`${event.max_attendees} seats`}
                      color="secondary"
                      variant="outlined"
                    />
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}