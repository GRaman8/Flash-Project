import { useRecoilState, useRecoilValue } from 'recoil';

import {
  canvasObjectsState,
  keyframesState,
  selectedObjectState,
  currentTimeState,
  durationState,
  isPlayingState,
  fabricCanvasState,
  selectedObjectPropertiesState,
} from './atoms';

import {
  selectedObjectDetailsSelector,
  selectedObjectKeyframesSelector,
} from './selectors';

// Custom hooks for easier state access
export const useCanvasObjects = () => {
  return useRecoilState(canvasObjectsState);
};

export const useKeyframes = () => {
  return useRecoilState(keyframesState);
};

export const useSelectedObject = () => {
  return useRecoilState(selectedObjectState);
};

export const useCurrentTime = () => {
  return useRecoilState(currentTimeState);
};

export const useDuration = () => {
  return useRecoilState(durationState);
};

export const useIsPlaying = () => {
  return useRecoilState(isPlayingState);
};

export const useFabricCanvas = () => {
  return useRecoilState(fabricCanvasState);
};

export const useSelectedObjectProperties = () => {
  return useRecoilState(selectedObjectPropertiesState);
};

// Read-only hooks
export const useSelectedObjectDetails = () => {
  return useRecoilValue(selectedObjectDetailsSelector);
};

export const useSelectedObjectKeyframes = () => {
  return useRecoilValue(selectedObjectKeyframesSelector);
};