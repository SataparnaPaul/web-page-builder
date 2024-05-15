import React, { useState, useEffect } from 'react';
import DroppableArea from './DroppableArea';
import axiosInstance from '../connectors/axiosInstance';
import withDragAndDrop from './withDragAndDrop';
import DraggableComponent from './DraggableComponent';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';

// Components library
const componentLibrary = [
  // { name: 'DraggableComponent', component: DraggableComponent, props: { type: 'DraggableComponent', width: '100px' } },
  { name: 'TextComponent', component: TextComponent, props: { text: 'text', type: 'TextComponent' } },
  // { name: 'ButtonComponent', component: ButtonComponent, props: { text: 'button', type: 'ButtonComponent' } },
];

const Editor = () => {
  const [components, setComponents] = useState([]);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const res = await axiosInstance.get('/components');
        setComponents(res.data.components);
      } catch (error) {
        console.error('Error fetching components:', error);
      }
    };
    fetchComponents();
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '200px', borderRight: '1px solid black', padding: '8px' }}>
        <h3>Component Library</h3>
        {
          componentLibrary.map(({ name, component, props }, index) => {
            const DragWrappedComponent = withDragAndDrop(component);
            return <DragWrappedComponent key={index} id={null} {...props} />;
          })
        }
      </div>
      <div style={{ flex: 1, padding: '8px', position: 'relative' }}>
        <h3>Editor</h3>
        <DroppableArea components={components} setComponents={setComponents} />
      </div>
    </div>
  );
};

export default Editor;
