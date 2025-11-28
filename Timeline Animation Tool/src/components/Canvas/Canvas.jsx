import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

import { 
  useSelectedObject, 
  useFabricCanvas,
  useSelectedObjectProperties,
  useCurrentTime,
  useKeyframes,
  useCanvasObjects 
} from '../../store/hooks';

import { 
  extractPropertiesFromFabricObject,
  findFabricObjectById 
} from '../../utils/fabricHelpers';

import { 
  findSurroundingKeyframes, 
  interpolateProperties, 
  applyPropertiesToFabricObject 
} from '../../utils/interpolation';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [selectedObject, setSelectedObject] = useSelectedObject();
  const [fabricCanvas, setFabricCanvas] = useFabricCanvas();
  const [, setSelectedObjectProperties] = useSelectedObjectProperties();
  const [currentTime] = useCurrentTime();
  const [keyframes] = useKeyframes();
  const [canvasObjects] = useCanvasObjects();

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 1200,
      height: 600,
      backgroundColor: '#f0f0f0',
    });

    setFabricCanvas(canvas);

    // Selection event handlers
    canvas.on('selection:created', (e) => {
      if (e.selected && e.selected[0]) {
        const id = e.selected[0].id;
        setSelectedObject(id);
        updateProperties(e.selected[0]);
      }
    });

    canvas.on('selection:updated', (e) => {
      if (e.selected && e.selected[0]) {
        const id = e.selected[0].id;
        setSelectedObject(id);
        updateProperties(e.selected[0]);
      }
    });

    canvas.on('selection:cleared', () => {
      setSelectedObject(null);
    });

    canvas.on('object:modified', (e) => {
      if (e.target) {
        updateProperties(e.target);
      }
    });

    // ADD THIS NEW HANDLER FOR TEXT EDITING
    canvas.on('mouse:dblclick', (e) => {
      if (e.target && e.target.type === 'text') {
        const newText = prompt('Enter new text:', e.target.text);
        if (newText !== null && newText !== '') {
          e.target.set('text', newText);
          canvas.renderAll();
        }
      }
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  const updateProperties = (fabricObject) => {
    const props = extractPropertiesFromFabricObject(fabricObject);
    if (props) {
      setSelectedObjectProperties(props);
    }
  };

  // Update canvas when time changes (for animation playback)
  useEffect(() => {
    if (!fabricCanvas) return;

    canvasObjects.forEach(obj => {
      const objectKeyframes = keyframes[obj.id] || [];
      if (objectKeyframes.length === 0) return;

      const fabricObject = findFabricObjectById(fabricCanvas, obj.id);
      if (!fabricObject) return;

      const { before, after } = findSurroundingKeyframes(objectKeyframes, currentTime);
      const interpolated = interpolateProperties(before, after, currentTime);
      
      if (interpolated) {
        applyPropertiesToFabricObject(fabricObject, interpolated);
      }
    });

    fabricCanvas.renderAll();
  }, [currentTime, keyframes, canvasObjects, fabricCanvas]);

  return (
    <div className="flex justify-center items-center flex-1 p-6 bg-gray-100">
      <div className="bg-white border border-gray-300 shadow">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

export default Canvas;