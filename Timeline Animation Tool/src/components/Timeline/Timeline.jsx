import React from 'react';
import { useCanvasObjects, useKeyframes } from '../../store/hooks';
import PlaybackControls from './PlaybackControls';
import TimelineScrubber from './TimelineScrubber';
import TimelineTrack from './TimelineTrack';

const Timeline = () => {
  const [canvasObjects] = useCanvasObjects();
  const [keyframes] = useKeyframes();

  return (
    <div className="bg-white border-t border-gray-300 overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-gray-300 bg-gray-50">
        <h2 className="text-base font-semibold text-gray-800">
          Timeline
        </h2>
      </div>
      
      <PlaybackControls />
      <TimelineScrubber />
      
      <div className="flex-1 overflow-y-auto bg-white">
        {canvasObjects.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            <p>
              Add elements to the stage to see timeline tracks
            </p>
          </div>
        ) : (
          canvasObjects.map(obj => (
            <TimelineTrack
              key={obj.id}
              object={obj}
              keyframes={keyframes[obj.id] || []}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;