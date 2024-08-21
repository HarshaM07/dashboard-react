// WidgetForm.js

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function WidgetForm({ onSave, onCancel, categories }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categories[0]?.id || ""
  );
  const [widgets, setWidgets] = useState([]);

  useEffect(() => {
    // Find the selected category
    const category = categories.find((cat) => cat.id === selectedCategory);
    // Set widgets for the selected category
    if (category) {
      setWidgets(category.widgets || []);
    }
  }, [selectedCategory, categories]);

  const handleSave = () => {
    if (name && text) {
      onSave(name, text);
    }
  };

  return (
    <div className="widget-form">
      <h2 className="form-heading">Add Widget</h2>
      <p>Personalize your dashboard by adding the following widget:</p>

      <div className="category-selection">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-item ${
              selectedCategory === cat.id ? "selected" : ""
            }`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </div>
        ))}
      </div>

      <div className="widgets-list">
        {widgets.length === 0 ? (
          <div className="empty-widget-box">
            <p>Add Widget</p>
          </div>
        ) : (
          widgets.map((widget) => (
            <div key={widget.id} className="widget-card">
              <h4>{widget.name}</h4>
              <p>{widget.text}</p>
            </div>
          ))
        )}
      </div>

      <label htmlFor="widget-name">Widget Name:</label>
      <input
        id="widget-name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor="widget-text">Widget Text:</label>
      <textarea
        id="widget-text"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="form-buttons">
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
        <button className="confirm-button" onClick={handleSave}>
          Add Widget
        </button>
      </div>
    </div>
  );
}

WidgetForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      widgets: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
};

export default WidgetForm;
