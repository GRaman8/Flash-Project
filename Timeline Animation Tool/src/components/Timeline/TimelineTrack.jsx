import React from 'react';
import { useSelectedObject, useDuration } from '../../store/hooks';

const TimelineTrack = ({ object, keyframes }) => {
  const [selectedObject] = useSelectedObject();
  const [duration] = useDuration();
  const isSelected = selectedObject === object.id;

  return (
    <div 
      className={`px-6 py-3 border-b border-gray-200 text-xs transition-colors ${
        isSelected ? 'bg-blue-100' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center gap-3">
        <p 
          className={`w-28 truncate text-sm ${
            isSelected ? 'text-blue-900 font-semibold' : 'text-gray-700 font-medium'
          }`}
        >
          {object.name}
        </p>
        
        <div className="flex-1 relative h-8 bg-gray-200 rounded border border-gray-300">
          {keyframes.map((kf, idx) => (
            <div
              key={idx}
              className="absolute top-1/2 w-3 h-3 bg-blue-700 rounded-full border border-white cursor-pointer transition-all hover:w-4 hover:h-4 -translate-x-1/2 -translate-y-1/2 shadow-sm"
              style={{
                left: `${(kf.time / duration) * 100}%`,
              }}
              title={`Keyframe at ${kf.time.toFixed(2)}s`}
            />
          ))}
        </div>
        
        <p 
          className="w-20 text-right text-xs text-gray-600 font-medium"
        >
          {keyframes.length} keyframes
        </p>
      </div>
    </div>
  );
};

export default TimelineTrack;