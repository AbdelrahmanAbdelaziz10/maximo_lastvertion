import React, { useState } from "react";
import "../../Style/SpecificationsTable.css";

export default function SpecificationsTable({ Title, data, variable }) {
  const [showFilter, setShowFilter] = useState(false);
  const [rows, setRows] = useState([]);

  const handleAddRow = () => {
    setRows([...rows, variable]);
  };

  return (
    <div className="specs-fancy-wrapper">
      {/* Header Bar */}
      <div className="specs-fancy-header">
        <h3>{Title}</h3>

        <div className="specs-fancy-actions">
          <button
            className={`filter-fancy-btn ${showFilter ? "active" : ""}`}
            onClick={() => setShowFilter(!showFilter)}
          >
            <i className="fa fa-filter"></i> Filter
          </button>

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
              {data?.map((item, index) => (
                <th key={index}> {item.label} </th>
              ))}
              
            </tr>

            {showFilter && (
              <tr className="filter-fancy-row">
                {data?.map((type, idx) => (
                  <td key={idx}>
                    <input
                      type={type}
                      placeholder={type === "date" ? "" : "Search..."}
                    />
                  </td>
                ))}
              </tr>
            )}
          </thead>

          <tbody>
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
          </tbody>
        </table>
      </div>

      {/* New Row Button */}
      <div className="new-fancy-row-container">
        <button className="new-fancy-row-btn" onClick={handleAddRow}>
           New Row
        </button>
      </div>
    </div>
  );
}
