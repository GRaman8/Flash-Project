import React, { useState } from 'react';
import EditorCanvas from './components/EditorCanvas';
import ToolPalette from './components/ToolPalette';
import PropertyInspector from './components/PropertyInspector';
import './App.css';

function App() {
  const [canvasInstance, setCanvasInstance] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const [jsonOutput, setJsonOutput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateJson = () => {
    if (!canvasInstance) return;
    // [cite_start]// Serialize the canvas, including the custom 'data' property [cite: 41]
    const json = canvasInstance.toJSON(['data']);
    setJsonOutput(JSON.stringify(json, null, 2));
    setIsModalOpen(true);
  };

  return (
    <div className="app-container">
      <ToolPalette
        canvas={canvasInstance}
        onGenerateJson={handleGenerateJson}
      />
      <div className="canvas-container">
        <EditorCanvas
          onCanvasReady={setCanvasInstance}
          onObjectSelected={setSelectedObject}
        />
      </div>
      <PropertyInspector
        selectedObject={selectedObject}
        canvas={canvasInstance}
      />

      {isModalOpen && (
        <JsonModal
          json={jsonOutput}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

// A simple modal component to display the JSON
const JsonModal = ({ json, onClose }) => (
  <div className="json-modal-overlay" onClick={onClose}>
    <div className="json-modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>Generated Canvas JSON</h3>
      <pre>{json}</pre>
      <button onClick={onClose}>Close</button>
    </div>
  </div>
);

export default App;