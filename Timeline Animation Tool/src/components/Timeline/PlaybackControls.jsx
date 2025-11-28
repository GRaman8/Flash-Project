import React, { useRef, useCallback } from 'react';
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
} from '@heroicons/react/24/solid';
import { 
  useIsPlaying, 
  useCurrentTime, 
  useDuration,
  useSelectedObject,
  useFabricCanvas,
  useKeyframes
} from '../../store/hooks';
import { extractPropertiesFromFabricObject, findFabricObjectById } from '../../utils/fabricHelpers';

const PlaybackControls = () => {
  const [isPlaying, setIsPlaying] = useIsPlaying();
  const [currentTime, setCurrentTime] = useCurrentTime();
  const [duration] = useDuration();
  const [selectedObject] = useSelectedObject();
  const [fabricCanvas] = useFabricCanvas();
  const [keyframes, setKeyframes] = useKeyframes();

  const animationFrameRef = useRef(null);
  const playbackStartTimeRef = useRef(null);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    playbackStartTimeRef.current = Date.now() - (currentTime * 1000);

    const animate = () => {
      const elapsed = (Date.now() - playbackStartTimeRef.current) / 1000;

      if (elapsed >= duration) {
        setCurrentTime(duration);
        setIsPlaying(false);
        return;
      }

      setCurrentTime(elapsed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [currentTime, duration, setCurrentTime, setIsPlaying]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, [setIsPlaying]);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setCurrentTime(0);
  }, [setCurrentTime, setIsPlaying]);

  const handleAddKeyframe = () => {
    if (!selectedObject || !fabricCanvas) return;

    const fabricObject = findFabricObjectById(fabricCanvas, selectedObject);
    if (!fabricObject) return;

    const properties = extractPropertiesFromFabricObject(fabricObject);
    const newKeyframe = {
      time: currentTime,
      properties,
    };

    setKeyframes(prev => {
      const objectKeyframes = prev[selectedObject] || [];
      const existingIndex = objectKeyframes.findIndex(
        kf => Math.abs(kf.time - currentTime) < 0.05
      );

      let updatedKeyframes;
      if (existingIndex >= 0) {
        updatedKeyframes = [...objectKeyframes];
        updatedKeyframes[existingIndex] = newKeyframe;
      } else {
        updatedKeyframes = [...objectKeyframes, newKeyframe]
          .sort((a, b) => a.time - b.time);
      }

      return {
        ...prev,
        [selectedObject]: updatedKeyframes,
      };
    });
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 border-b border-gray-300">
      <button 
        onClick={handlePlay} 
        disabled={isPlaying}
        className="p-2 text-blue-700 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded transition text-xs"
        title="Play"
      >
        <PlayIcon className="w-5 h-5" />
      </button>
      
      <button 
        onClick={handlePause} 
        disabled={!isPlaying}
        className="p-2 text-blue-700 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed rounded transition text-xs"
        title="Pause"
      >
        <PauseIcon className="w-5 h-5" />
      </button>
      
      <button 
        onClick={handleStop}
        className="p-2 text-blue-700 hover:bg-gray-200 rounded transition text-xs"
        title="Stop"
      >
        <StopIcon className="w-5 h-5" />
      </button>
      
      <span className="text-xs ml-3 min-w-24 text-gray-700 font-medium">
        {currentTime.toFixed(2)}s / {duration.toFixed(1)}s
      </span>
      
      <button 
        onClick={handleAddKeyframe}
        disabled={!selectedObject}
        className="ml-auto px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
      >
        ADD KEYFRAME
      </button>
    </div>
  );
};

export default PlaybackControls;