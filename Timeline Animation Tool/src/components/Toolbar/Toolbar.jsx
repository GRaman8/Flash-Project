import React from 'react';

import { 
  Box, 
  IconButton, 
  Divider, 
  Tooltip, 
  Paper 
} from '@mui/material';

import {
  Crop32 as RectangleIcon,
  Circle as CircleIcon,
  TextFields as TextIcon,
  Delete as DeleteIcon,
  KeyboardArrowUp as ArrowUpIcon,
  KeyboardArrowDown as ArrowDownIcon,
} from '@mui/icons-material';
import { useSelectedObject, useFabricCanvas, useCanvasObjects, useKeyframes } from '../../store/hooks';
import { createFabricObject } from '../../utils/fabricHelpers';

const Toolbar = () => {
  const [selectedObject] = useSelectedObject();
  const [fabricCanvas] = useFabricCanvas();
  const [canvasObjects, setCanvasObjects] = useCanvasObjects();
  const [keyframes, setKeyframes] = useKeyframes();

  const addElement = (type) => {
    if (!fabricCanvas) return;

    const id = `element_${Date.now()}`;
    const count = canvasObjects.filter(obj => obj.type === type).length + 1;
    const name = `${type}_${count}`;

    const fabricObject = createFabricObject(type, id);
    if (!fabricObject) return;

    fabricCanvas.add(fabricObject);
    fabricCanvas.setActiveObject(fabricObject);
    fabricCanvas.renderAll();

    // Add to state
    setCanvasObjects(prev => [...prev, { id, type, name }]);
    setKeyframes(prev => ({ ...prev, [id]: [] }));
  };

  const deleteObject = () => {
    if (!selectedObject || !fabricCanvas) return;

    const fabricObject = fabricCanvas.getObjects().find(obj => obj.id === selectedObject);
    if (fabricObject) {
      fabricCanvas.remove(fabricObject);
      fabricCanvas.renderAll();
    }

    setCanvasObjects(prev => prev.filter(obj => obj.id !== selectedObject));
    setKeyframes(prev => {
      const updated = { ...prev };
      delete updated[selectedObject];
      return updated;
    });
  };

  const moveLayer = (direction) => {
    if (!selectedObject || !fabricCanvas) return;

    const fabricObject = fabricCanvas.getObjects().find(obj => obj.id === selectedObject);
    if (!fabricObject) return;

    if (direction === 'up') {
      fabricCanvas.bringForward(fabricObject);
    } else {
      fabricCanvas.sendBackwards(fabricObject);
    }
    fabricCanvas.renderAll();
  };

  return (
    <Paper 
      sx={{ 
        width: 80, 
        display: 'flex', 
        flexDirection: 'column', 
        p: 1, 
        gap: 1,
        borderRadius: 0
      }}
    >
      <Tooltip title="Add Rectangle" placement="right">
        <IconButton onClick={() => addElement('rectangle')} color="primary">
          <RectangleIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Add Circle" placement="right">
        <IconButton onClick={() => addElement('circle')} color="primary">
          <CircleIcon />
        </IconButton>
      </Tooltip>
      
      <Tooltip title="Add Text" placement="right">
        <IconButton onClick={() => addElement('text')} color="primary">
          <TextIcon />
        </IconButton>
      </Tooltip>
      
      <Divider sx={{ my: 1 }} />
      
      <Tooltip title="Delete" placement="right">
        <span>
          <IconButton 
            onClick={deleteObject} 
            disabled={!selectedObject}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </span>
      </Tooltip>
      
      <Tooltip title="Bring Forward" placement="right">
        <span>
          <IconButton 
            onClick={() => moveLayer('up')} 
            disabled={!selectedObject}
          >
            <ArrowUpIcon />
          </IconButton>
        </span>
      </Tooltip>
      
      <Tooltip title="Send Backward" placement="right">
        <span>
          <IconButton 
            onClick={() => moveLayer('down')} 
            disabled={!selectedObject}
          >
            <ArrowDownIcon />
          </IconButton>
        </span>
      </Tooltip>
    </Paper>
  );
};

export default Toolbar;