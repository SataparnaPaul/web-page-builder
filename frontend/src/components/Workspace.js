import React from 'react';

const Workspace = ({ components }) => {
  components = components || [];
  return (
    <div className="workspace">
      {/* Render workspace with draggable components */}
      <h2>Workspace</h2>
      <div className="workspace-content">
        {/* Render components dynamically */}
        {/* {components?.map((component) => (
          <div key={component.id}>{component.name}</div>
        ))} */}
      </div>
    </div>
  );
}

export default Workspace;
