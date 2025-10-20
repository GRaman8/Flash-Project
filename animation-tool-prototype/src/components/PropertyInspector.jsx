import React, { useState, useEffect } from 'react';

const PropertyInspector = ({ selectedObject, canvas }) => {
  // Use local state to manage form inputs
  const [formData, setFormData] = useState({});

  // When selectedObject changes, update the local form state
  useEffect(() => {
    if (selectedObject && selectedObject.data) {
      setFormData(selectedObject.data);
    } else {
      setFormData({});
    }
  }, [selectedObject]);

  // Handle changes to any input field
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // On blur (when user clicks away), update the actual Fabric object
  // CORRECTED: Removed the underscore from the arrow function syntax
  const handleBlur = () => {
    if (selectedObject && canvas) {
      // Update the 'data' property on the Fabric object
      selectedObject.set('data', formData);
      canvas.renderAll();
    }
  };

  // Render specific form fields based on the node type
  const renderFormFields = () => {
    if (!selectedObject || !formData.type) return null;

    const commonFields = (
      <div className="form-group">
        <label>Node Type</label>
        <input type="text" value={formData.type} disabled />
      </div>
    );

    switch (formData.type) {
      case 'CreationNode':
        return (
          <>
            {commonFields}
            <div className="form-group">
              <label>Target Selector</label>
              <input
                type="text"
                name="target"
                value={formData.target || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label>Duration (s)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration || 0}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <div className="form-group">
              <label>Properties (JSON)</label>
              <textarea
                name="properties"
                value={formData.properties || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </>
        );
      case 'ProcessNode':
        return (
          <>
            {commonFields}
            {/* CORRECTED: Fixed typo from "form-grop" to "form-group" */}
            <div className="form-group">
              <label>Condition</label>
              <input
                type="text"
                name="condition"
                value={formData.condition || ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
          </>
        );
      // Add cases for StartNode, SubroutineNode, etc.
      default:
        return commonFields;
    }
  };

  return (
    <aside className="property-inspector">
      <h3>Property Inspector</h3>
      {selectedObject ? (
        <form onSubmit={(e) => e.preventDefault()}>
          {renderFormFields()}
        </form>
      ) : (
        <div className="inspector-placeholder">
          <p>Select a node to edit its properties.</p>
        </div>
      )}
    </aside>
  );
};

export default PropertyInspector;
