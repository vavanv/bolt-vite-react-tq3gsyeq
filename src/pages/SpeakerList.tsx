import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import { mockSpeakers } from '../store/mockData';

export default function SpeakerList() {
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Speakers</Typography>
        <Button variant="contained" color="primary">
          Add Speaker
        </Button>
      </Box>
      
      <Grid container spacing={3}>
        {mockSpeakers.map((speaker) => (
          <Grid item xs={12} md={6} key={speaker.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Avatar
                    sx={{ width: 64, height: 64 }}
                    src={`https://i.pravatar.cc/150?u=${speaker.id}`}
                  />
                  <Box>
                    <Typography variant="h6">
                      Speaker {speaker.id}
                    </Typography>
                    <Typography color="textSecondary">
                      {speaker.expertise.join(', ')}
                    </Typography>
                  </Box>
                </Box>
                <Typography paragraph>
                  {speaker.bio}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {speaker.expertise.map((exp) => (
                    <Chip
                      key={exp}
                      label={exp}
                      variant="outlined"
                      color="primary"
                      size="small"
                    />
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}