import * as fabric from 'fabric';

/**
 * Create a new Fabric.js object based on type
 */
export const createFabricObject = (type, id) => {
  const baseProps = {
    id,
    left: 100,
    top: 100,
  };

  switch (type) {
    case 'rectangle':
      return new fabric.Rect({
        ...baseProps,
        width: 100,
        height: 100,
        fill: '#3b82f6',
      });
    
    case 'circle':
      return new fabric.Circle({
        ...baseProps,
        radius: 50,
        fill: '#ef4444',
      });
    
    case 'text':
      return new fabric.Text('Text', {
        ...baseProps,
        fontSize: 24,
        fill: '#000000',
      });
    
    default:
      return null;
  }
};

/**
 * Extract properties from a Fabric.js object
 */
export const extractPropertiesFromFabricObject = (fabricObject) => {
  if (!fabricObject) return null;

  return {
    x: fabricObject.left || 0,
    y: fabricObject.top || 0,
    scaleX: fabricObject.scaleX || 1,
    scaleY: fabricObject.scaleY || 1,
    rotation: fabricObject.angle || 0,
    opacity: fabricObject.opacity !== undefined ? fabricObject.opacity : 1,
  };
};

/**
 * Find a Fabric.js object by ID
 */
export const findFabricObjectById = (canvas, id) => {
  if (!canvas) return null;
  return canvas.getObjects().find(obj => obj.id === id) || null;
};