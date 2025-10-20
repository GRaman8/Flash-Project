import React from 'react';
import * as fabric from 'fabric';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import WebhookIcon from '@mui/icons-material/Webhook';
import DiamondIcon from '@mui/icons-material/Diamond';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DataObjectIcon from '@mui/icons-material/DataObject';

const ToolPalette = ({ canvas, onGenerateJson }) => {
  
  const addNode = (nodeType) => {
    if (!canvas) return;

    let node;
    const commonProps = {
      left: 100,
      top: 100,
    };

    switch (nodeType) {
      case 'Start':
        // Start Node (Oval)
        node = new fabric.Ellipse({
          ...commonProps,
          rx: 75,
          ry: 40,
          fill: '#4CAF50',
          data: { type: 'StartNode' },
        });
        break;
      
      case 'Creation':
        // Creation Node (Parallelogram)
        node = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: 150, y: 0 },
            { x: 120, y: 60 },
            { x: -30, y: 60 },
          ],
          {
            ...commonProps,
            fill: '#FFC107',
            data: {
              type: 'CreationNode',
              target: '#myElement',
              duration: 1,
              properties: '{\n  "x": 200,\n  "opacity": 0.5\n}',
            },
          }
        );
        break;

      case 'Process':
        // Process Node (Diamond)
        node = new fabric.Polygon(
          [
            { x: 75, y: 0 },
            { x: 150, y: 75 },
            { x: 75, y: 150 },
            { x: 0, y: 75 },
          ],
          {
            ...commonProps,
            fill: '#03A9F4',
            data: { type: 'ProcessNode', condition: 'onClick' },
          }
        );
        break;

      case 'Subroutine':
        // Subroutine Node (Rectangle)
        node = new fabric.Rect({
          ...commonProps,
          width: 150,
          height: 60,
          fill: '#9C27B0',
          data: { type: 'SubroutineNode', ref: 'otherDiagram' },
        });
        break;
      
      default:
        return;
    }

    canvas.add(node);
    canvas.renderAll();
  };

  return (
    <aside className="tool-palette">
      <h3>Diagram Nodes</h3>
      <button onClick={() => addNode('Start')}>
        <PlayArrowIcon /> Start Node
      </button>
      <button onClick={() => addNode('Creation')}>
        <WebhookIcon /> Creation Node
      </button>
      <button onClick={() => addNode('Process')}>
        <DiamondIcon /> Process Node
      </button>
      <button onClick={() => addNode('Subroutine')}>
        <AccountTreeIcon /> Subroutine Node
      </button>

      <button className="json-button" onClick={onGenerateJson}>
        <DataObjectIcon /> Generate JSON
      </button>
    </aside>
  );
};

export default ToolPalette;