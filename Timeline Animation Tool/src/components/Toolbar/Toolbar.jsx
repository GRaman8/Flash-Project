import React from 'react';
import {
  RectangleStackIcon,
  CircleStackIcon,
  PencilIcon,
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';

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
    <div className="w-20 flex flex-col bg-white border-r border-gray-300 shadow-md">
      <button 
        onClick={() => addElement('rectangle')}
        className="p-4 text-blue-700 hover:bg-gray-100 transition-colors border-b border-gray-200"
        title="Add Rectangle"
      >
        <RectangleStackIcon className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => addElement('circle')}
        className="p-4 text-blue-700 hover:bg-gray-100 transition-colors border-b border-gray-200"
        title="Add Circle"
      >
        <CircleStackIcon className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => addElement('text')}
        className="p-4 text-blue-700 hover:bg-gray-100 transition-colors border-b border-gray-200"
        title="Add Text"
      >
        <PencilIcon className="w-6 h-6" />
      </button>
      
      <div className="border-b border-gray-300 my-1" />
      
      <button 
        onClick={deleteObject}
        disabled={!selectedObject}
        className="p-4 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-b border-gray-200"
        title="Delete"
      >
        <TrashIcon className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => moveLayer('up')}
        disabled={!selectedObject}
        className="p-4 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors border-b border-gray-200"
        title="Bring Forward"
      >
        <ArrowUpIcon className="w-6 h-6" />
      </button>
      
      <button 
        onClick={() => moveLayer('down')}
        disabled={!selectedObject}
        className="p-4 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        title="Send Backward"
      >
        <ArrowDownIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Toolbar;