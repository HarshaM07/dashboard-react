// Category.js

import React from "react";
import PropTypes from "prop-types";

function Category({ category, onAddWidget, onRemoveWidget, searchQuery }) {
  // Filter widgets based on the search query
  const filteredWidgets = category.widgets.filter(widget =>
    widget.name.toLowerCase().includes(searchQuery)
  );

  // Calculate the number of empty boxes needed
  const emptyBoxCount = 3 - filteredWidgets.length;

  return (
    <div className="category">
      <div className="category-header">
        <h2>{category.name}</h2>
       
      </div>
      <div className="widget-grid">
        {filteredWidgets.map((widget) => (
          <div key={widget.id} className="widget">
            <h4>{widget.name}</h4>
            <p>{widget.text}</p>
            <span className="remove" onClick={() => onRemoveWidget(category.id, widget.id)}>×</span>
          </div>
        ))}
        {emptyBoxCount > 0 && (
          <div className="empty-widget-box" onClick={onAddWidget}>
            <p>+ Add Widget</p>
          </div>
        )}
      </div>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    widgets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onAddWidget: PropTypes.func.isRequired,
  onRemoveWidget: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
};

export default Category;
