import React, { useState } from 'react'
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MultipleCIs = ({Title,variable,data}) => {
 const [showFilter, setShowFilter] = useState(false);
  const [rows, setRows] = useState([]);
// ADD THIS AT TOP
const [openDropdown, setOpenDropdown] = useState(false);

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
        asstes:"",
        location:"",
        site:""
      },
    ]);
  };

  return (
    <div className="specs-fancy-wrapper" >
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
                {data?.map((item,index)=>(
                    <th key={index}>
                        {item}
                    </th>
                ))}

            </tr>

            {showFilter && (
              <tr className="filter-fancy-row">
                {[
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
                  "text",
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
<div className="assign-buttons justify-content-end">

  {/* CUSTOM REACT DROPDOWN */}
  <div className="custom-dropdown">
<button
  className="assign-btn gradient-blue"
  onClick={() => setOpenDropdown(!openDropdown)}
>
  <i className="fa fa-people-carry"></i>
  Select
  <ArrowDropDownIcon style={{ marginLeft: 6, fontSize: 22 }} />
</button>


    {openDropdown && (
      <ul className="custom-dropdown-menu">
        <li className="dropdown-item">Assets</li>
        <li className="dropdown-item">Locations</li>
        <li className="dropdown-item">CIS</li>
        <li className="dropdown-item">From Routes</li>
        <li className="dropdown-item">From Collections</li>

        {/* <hr /> */}

        <li className="dropdown-item">Assets</li>
        <li className="dropdown-item">Locations</li>
        <li className="dropdown-item">CIs</li>
      </ul>
    )}
  </div>

  {/* OTHER BUTTONS */}
  <button className="assign-btn outline-btn">
    <i className="fa fa-check-circle"></i>
    Clear All
  </button>

  <button className="assign-btn outline-btn" onClick={handleAddRow}>
    <i className="fa fa-plus"></i>
    New Row
  </button>

</div>




    </div>
  );
}

export default MultipleCIs
