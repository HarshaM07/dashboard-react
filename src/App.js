// App.js

import React, { useState } from "react";
import Category from "./Category";
import WidgetForm from "./WidgetForm";
import dashboardData from "./dashboarddata.json"; // Import JSON data
import "./App.css";

function App() {
  const [data, setData] = useState(dashboardData);
  const [showForm, setShowForm] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const addCategory = (name) => {
    const newCategory = {
      id: "c" + (data.categories.length + 1),
      name,
      widgets: [],
    };
    setData({
      ...data,
      categories: [...data.categories, newCategory],
    });
  };

  const addWidget = (name, text) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === currentCategoryId) {
        const newWidget = {
          id: "w" + Date.now().toString().slice(-4),
          name,
          text,
        };
        return {
          ...category,
          widgets: [...category.widgets, newWidget],
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
    setShowForm(false);
  };

  const removeWidget = (categoryId, widgetId) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });
    setData({ ...data, categories: updatedCategories });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleAddWidgetClick = () => {
    if (data.categories.length > 0) {
      setCurrentCategoryId(data.categories[0].id); // Set the first category as default
      setShowForm(true);
    } else {
      alert("Please add a category first.");
    }
  };

  const handleRefresh = () => {
    setData(dashboardData); // Reset data to the original state
  };

  return (
    <div className="App">
      <header className="header">
        <div className="breadcrumb">
          <span>Home</span> &gt;{" "}
          <span className="dashboard-title">Dashboard v2</span>
        </div>
        <div className="search-container">
          <input
            type="text"
            id="search-input"
            placeholder="Search anything..."
            onChange={handleSearch}
          />
          <i className="fas fa-search search-icon"></i>
        </div>
        <div className="header-actions">
          <button className="add-widget-button" onClick={handleAddWidgetClick}>
            Add Widget +
          </button>
          <i className="fas fa-sync refresh-icon" onClick={handleRefresh}></i>
        </div>
      </header>
      <main className="main-content">
        <div className="dashboard">
          {data.categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              onAddWidget={() => {
                setCurrentCategoryId(category.id);
                setShowForm(true);
              }}
              onRemoveWidget={removeWidget}
              searchQuery={searchQuery}
            />
          ))}
        </div>
        <div id="widget-form-container" className={showForm ? "open" : ""}>
          <WidgetForm
            onSave={addWidget}
            onCancel={() => setShowForm(false)}
            categories={data.categories}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
