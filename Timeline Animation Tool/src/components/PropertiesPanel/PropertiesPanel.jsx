import React from 'react';
import { 
  useSelectedObject, 
  useSelectedObjectProperties,
  useSelectedObjectDetails 
} from '../../store/hooks';

const PropertiesPanel = () => {
  const [selectedObject] = useSelectedObject();
  const [properties] = useSelectedObjectProperties();
  const selectedDetails = useSelectedObjectDetails();

  return (
    <div className="w-80 flex-shrink-0 h-full border-l border-gray-300 bg-white flex flex-col shadow-lg">
      <div className="px-6 py-4 border-b border-gray-300 bg-gray-50">
        <h2 className="text-base font-semibold text-gray-800">
          Properties
        </h2>
      </div>
      <div className="flex-1 overflow-auto p-5">
        {selectedObject && selectedDetails ? (
          <div>
            <div 
              className="p-4 mb-5 bg-blue-600 text-white border border-blue-700 rounded text-sm"
            >
              <p className="font-semibold text-sm">
                {selectedDetails.name}
              </p>
              <p className="text-xs text-blue-100 mt-2">
                {selectedDetails.type}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">X Position</label>
                <input
                  type="number"
                  value={Math.round(properties.x)}
                  disabled
                  readOnly
                  className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded text-gray-600 cursor-not-allowed focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Y Position</label>
                <input
                  type="number"
                  value={Math.round(properties.y)}
                  disabled
                  readOnly
                  className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded text-gray-600 cursor-not-allowed focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Scale X</label>
                <input
                  type="number"
                  value={properties.scaleX.toFixed(2)}
                  disabled
                  readOnly
                  className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded text-gray-600 cursor-not-allowed focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Scale Y</label>
                <input
                  type="number"
                  value={properties.scaleY.toFixed(2)}
                  disabled
                  readOnly
                  className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded text-gray-600 cursor-not-allowed focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">Rotation</label>
                <input
                  type="number"
                  value={Math.round(properties.rotation)}
                  disabled
                  readOnly
                  className="w-full px-3 py-2 text-sm bg-gray-100 border border-gray-300 rounded text-gray-600 cursor-not-allowed focus:outline-none"
                />
              </div>
              
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">
                  Opacity: {(properties.opacity * 100).toFixed(0)}%
                </p>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={properties.opacity}
                  disabled
                  className="w-full cursor-not-allowed opacity-60 accent-blue-600 h-2"
                />
              </div>
            </div>
            
            <hr className="my-5 border-gray-300" />
            
            <div 
              className="p-4 bg-cyan-600 text-white border border-cyan-700 rounded text-xs leading-relaxed"
            >
              💡 <strong>Tip:</strong> Modify the object on the stage by dragging, resizing, or rotating it. Then click "Add Keyframe" to record its state at the current time.
            </div>
          </div>
        ) : (
          <div 
            className="p-5 text-center py-12 bg-gray-50 border border-gray-300 rounded text-gray-600 text-xs"
          >
            Select an object on the stage to view and edit its properties
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPanel;