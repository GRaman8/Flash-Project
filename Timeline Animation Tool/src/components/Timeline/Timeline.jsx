import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useCanvasObjects, useKeyframes } from '../../store/hooks';
import PlaybackControls from './PlaybackControls';
import TimelineScrubber from './TimelineScrubber';
import TimelineTrack from './TimelineTrack';

const Timeline = () => {
  const [canvasObjects] = useCanvasObjects();
  const [keyframes] = useKeyframes();

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Timeline
      </Typography>
      
      <PlaybackControls />
      <TimelineScrubber />
      
      <Box sx={{ maxHeight: 250, overflowY: 'auto' }}>
        {canvasObjects.length === 0 ? (
          <Box sx={{ 
            textAlign: 'center', 
            py: 4, 
            color: 'text.secondary' 
          }}>
            <Typography variant="body2">
              Add elements to the stage to see timeline tracks
            </Typography>
          </Box>
        ) : (
          canvasObjects.map(obj => (
            <TimelineTrack
              key={obj.id}
              object={obj}
              keyframes={keyframes[obj.id] || []}
            />
          ))
        )}
      </Box>
    </Paper>
  );
};

export default Timeline;