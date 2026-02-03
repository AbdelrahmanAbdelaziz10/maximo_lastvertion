import React, { useState } from "react";
import "../../Style/SpecificationsTable.css";

const FailureCode = () => {
 const [showFilter, setShowFilter] = useState(false);
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        attribute: "",
        description: "",
        dataType: "",
        dateValue: "",
        alphanumericValue: "",
        numericValue: "",
        unitOfMeasure: "",
        section: "",
      },
    ]);
  };

  return (
    <div className="specs-fancy-wrapper" >
      {/* Header Bar */}
      <div className="specs-fancy-header">
        <h3>
Failure Codes
</h3>

        <div className="specs-fancy-actions">
          {/* <button
            className={`filter-fancy-btn ${showFilter ? "active" : ""}`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <i className="fa fa-filter"></i> Filter
          </button> */}

          <button className="icon-fancy-btn" title="Refresh">
            <i className="fa fa-refresh"></i>
          </button>

          <span className="rows-fancy-info">0 - 0 of 0</span>

          <button className="icon-fancy-btn" title="Download">
            <i className="fa fa-download"></i>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="specs-fancy-table-container">
        <table className="specs-fancy-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Failure Codes
</th>
                           <th>Description</th>

            </tr>

            {/* {showFilter && (
              <tr className="filter-fancy-row">
                {[
                  "text",
                  "text",
                  "text",
                  "date",
                  "text",
                  "number",
                  "text",
                  "text",
                ].map((type, idx) => (
                  <td key={idx}>
                    <input
                      type={type}
                      placeholder={type === "date" ? "" : "Search..."}
                    />
                  </td>
                ))}
              </tr>
            )} */}
          </thead>

          {/* <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="8" className="fancy-empty-msg">
                  <div className="no-fancy-rows">
                    <p>There are no rows to display.</p>
                  </div>
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.attribute}</td>
                  <td>{r.description}</td>
                  <td>{r.dataType}</td>
                  <td>{r.dateValue}</td>
                  <td>{r.alphanumericValue}</td>
                  <td>{r.numericValue}</td>
                  <td>{r.unitOfMeasure}</td>
                  <td>{r.section}</td>
                </tr>
              ))
            )}
          </tbody> */}
        </table>
      </div>

      {/* New Row Button */}
      <div className="new-fancy-row-container">
        <button className="new-fancy-row-btn" onClick={handleAddRow}>
          <i className="fa fa-plus"></i> Select Failure Codes
        </button>
      </div>
    </div>
  );
}

export default FailureCode
