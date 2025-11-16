import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useSelectedObject, useDuration } from '../../store/hooks';

const TimelineTrack = ({ object, keyframes }) => {
  const [selectedObject] = useSelectedObject();
  const [duration] = useDuration();
  const isSelected = selectedObject === object.id;

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 1, 
        mb: 1,
        bgcolor: isSelected ? 'action.selected' : 'background.paper',
        transition: 'background-color 0.2s',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography 
          variant="body2" 
          sx={{ minWidth: 100, fontWeight: isSelected ? 600 : 400 }}
        >
          {object.name}
        </Typography>
        
        <Box sx={{ 
          flex: 1, 
          position: 'relative', 
          height: 30, 
          bgcolor: '#f5f5f5', 
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}>
          {keyframes.map((kf, idx) => (
            <Box
              key={idx}
              sx={{
                position: 'absolute',
                left: `${(kf.time / duration) * 100}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 8,
                height: 8,
                bgcolor: 'primary.main',
                borderRadius: '50%',
                border: '2px solid white',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  width: 12,
                  height: 12,
                  bgcolor: 'primary.dark',
                }
              }}
            />
          ))}
        </Box>
        
        <Typography 
          variant="caption" 
          sx={{ minWidth: 80, textAlign: 'right', color: 'text.secondary' }}
        >
          {keyframes.length} keyframe{keyframes.length !== 1 ? 's' : ''}
        </Typography>
      </Box>
    </Paper>
  );
};

export default TimelineTrack;