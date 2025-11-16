import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Toolbar from '../Toolbar/Toolbar';
import Canvas from '../Canvas/Canvas';
import Timeline from '../Timeline/Timeline';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Left Toolbar */}
        <Toolbar />
        
        {/* Main Content Area */}
        <Box sx={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          p: 2, 
          overflow: 'auto',
          bgcolor: '#f5f5f5'
        }}>
          <Canvas />
          <Timeline />
        </Box>
        
        {/* Right Properties Panel */}
        <PropertiesPanel />
      </Box>
    </Box>
  );
};

export default MainLayout;