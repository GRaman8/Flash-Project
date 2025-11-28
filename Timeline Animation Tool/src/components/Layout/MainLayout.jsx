import React from 'react';
import Header from './Header';
import Toolbar from '../Toolbar/Toolbar';
import Canvas from '../Canvas/Canvas';
import Timeline from '../Timeline/Timeline';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      <Header />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <Toolbar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100">
          <Canvas />
          <Timeline />
        </div>
        
        {/* Right Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default MainLayout;