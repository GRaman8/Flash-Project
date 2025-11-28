import React from 'react';
import { useCurrentTime, useDuration, useIsPlaying } from '../../store/hooks';

const TimelineScrubber = () => {
  const [currentTime, setCurrentTime] = useCurrentTime();
  const [duration] = useDuration();
  const [isPlaying] = useIsPlaying();

  const handleTimeChange = (event) => {
    setCurrentTime(parseFloat(event.target.value));
  };

  return (
    <div className="px-6 py-3 bg-gray-50 border-b border-gray-300">
      <input
        type="range"
        min="0"
        max={duration}
        step="0.01"
        value={currentTime}
        onChange={handleTimeChange}
        disabled={isPlaying}
        className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed accent-blue-600"
        title={`${currentTime.toFixed(2)}s`}
      />
    </div>
  );
};

export default TimelineScrubber;