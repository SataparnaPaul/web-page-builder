import React from 'react';
import { useDrop } from 'react-dnd';
import axiosInstance from '../connectors/axiosInstance';
import withDragAndDrop from './withDragAndDrop';

// Import all the components you want to use
import DraggableComponent from './DraggableComponent';
import TextComponent from './TextComponent';
import ButtonComponent from './ButtonComponent';

// Component mapping
const componentMapping = {
  DraggableComponent,
  TextComponent,
  ButtonComponent
};

const ItemTypes = {
  COMPONENT: 'component',
};

const DroppableArea = ({ components, setComponents }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.COMPONENT,
    drop: async (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      const dropTargetRect = document.getElementById('droppable-area').getBoundingClientRect();
      const newItem = {
        ...item,
        x: clientOffset.x - dropTargetRect.left,
        y: clientOffset.y - dropTargetRect.top,
      };

      const updatedRemote = (updatedComponents) => {
        try {
          axiosInstance.post('http://localhost:5000/components', { components: updatedComponents });
        } catch (error) {
          console.error('Error saving component position:', error);
        }
      }
      setComponents((prevComponents) => {
        const existingItemIndex = prevComponents.findIndex((component) => component.id === item.id);

        if (existingItemIndex !== -1) {
          // Update existing item
          const updatedComponents = [...prevComponents];
          updatedComponents[existingItemIndex] = newItem;
          updatedRemote(updatedComponents);
          return updatedComponents;
        } else {
          // Add new item
          updatedRemote([...prevComponents, newItem]);
          return [...prevComponents, newItem];
        }
      });
    
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      id="droppable-area"
      ref={drop}
      style={{
        height: '100%',
        width: '100%',
        border: '1px solid black',
        backgroundColor: isOver ? 'lightblue' : 'white',
        position: 'relative',
      }}
    >
      {components.map(({ id, type, x, y, ...props }) => {
        const Component = componentMapping[type];
        if (!Component) return null;
        const DragWrappedComponent = withDragAndDrop(Component);
        return <DragWrappedComponent key={id} id={id} type={type} x={x} y={y} {...props.props} />;
      })}
    </div>
  );
};

export default DroppableArea;
