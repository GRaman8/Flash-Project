import React, { useEffect, useRef } from 'react';
import * as fabric from 'fabric';

const EditorCanvas = ({ onCanvasReady, onObjectSelected }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    // Initialize the canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 700,
      backgroundColor: '#fff',
    });

    fabricCanvasRef.current = canvas;

    onCanvasReady(canvas);

    const handleSelection = (e) => {
      onObjectSelected(e.selected?.[0] || null);
    };

    const handleSelectionCleared = () => {
      onObjectSelected(null);
    };

    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleSelectionCleared);

    return () => {
      canvas.off('selection:created', handleSelection);
      canvas.off('selection:updated', handleSelection);
      canvas.off('selection:cleared', handleSelectionCleared);
      canvas.dispose();
    };
  }, [onCanvasReady, onObjectSelected]);

  return <canvas ref={canvasRef} />;
};

export default EditorCanvas;
