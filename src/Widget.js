import React from "react";

function Widget({ widget, onRemove }) {
  return (
    <div className="widget">
      <div>
        <strong>{widget.name}</strong>: {widget.text}
      </div>
      <span className="remove" onClick={onRemove}>
        x
      </span>
    </div>
  );
}

export default Widget;
