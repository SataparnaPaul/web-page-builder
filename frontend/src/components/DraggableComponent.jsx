import React from 'react';
import { useDrag } from 'react-dnd';

const ItemTypes = {
  COMPONENT: 'component',
};

const DraggableComponent = ({ id, type, width, x, y }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COMPONENT,
    item: { id, type, width, x, y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        border: '1px solid gray',
        backgroundColor: 'white',
        width: width,
        position: 'absolute',
        left: x,
        top: y,
      }}
    >
        component
    </div>
  );
};

export default DraggableComponent;
