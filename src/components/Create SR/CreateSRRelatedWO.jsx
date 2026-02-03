import { useState } from "react";
import { ChevronRight, Filter, Trash2 } from "lucide-react";
import {
  Container,
  Row,
  Col,
  Nav,
  Card,
  Table,
  Form,
  Button,
} from "react-bootstrap";

const CreateSRRelatedWO = () => {
  const [showFilter, setShowFilter] = useState(false);
   const [workLogData, setWorkLogData] = useState([]);
 
   const handleWorkLogCheckboxChange = (index) => {
     const newData = [...workLogData];
     newData[index].viewable = !newData[index].viewable;
     setWorkLogData(newData);
   };
 
   const handleDeleteRow = (index) => {
     const newData = workLogData.filter((_, i) => i !== index);
     setWorkLogData(newData);
   };
 
   return (
     <Container className=" mb-5">
       <Card className="shadow-sm border-0 rounded-3 overflow-hidden">
         {/* Header */}
         <Card.Header className="border-bottom p-2 pt-0 mb-1">
           <Nav variant="tabs" className="border-0">
             <Nav.Item
               className="py-3 px-4 fw-semibold border-0"
               style={{
                 backgroundColor: "var(--srExtend-navBar)",
                 color: "#fff",
                 borderBottom: "2px solid #1976d2",
               }}
             >
               Related Work Orders
             </Nav.Item>
           </Nav>
         </Card.Header>
 
         {/* Body */}
         <Card.Body className="p-0">
           {/* Toolbar */}
           <Row className="align-items-center bg-light py-2 px-3 m-0 border-bottom">
             <Col md={6}>
               <div className="d-flex align-items-center">
                 <span className="fw-semibold me-3">Work Orders</span>
                 <Button
                   variant="outline-secondary"
                   size="sm"
                   onClick={() => setShowFilter(!showFilter)}
                   className="d-flex align-items-center"
                 >
                   <Filter size={14} className="me-1" />
                   Filter
                 </Button>
               </div>
             </Col>
             <Col md={6} className="text-end">
               <span className="text-muted small">
                 {workLogData.length} - {workLogData.length} of{" "}
                 {workLogData.length}
               </span>
             </Col>
           </Row>
 
           {/* Table */}
<div className="table-responsive">
  <Table hover className="mb-0 align-middle">
    <thead className="bg-light">
      <tr>
        <th className="px-3 py-2 border-end">Work Order</th>
        <th className="px-3 py-2 border-end">Description</th>
        <th className="px-3 py-2 border-end">Class</th>
        <th className="px-3 py-2 border-end">Status</th>
        <th className="px-3 py-2 border-end">Relationship</th>
        <th className="px-3 py-2 text-center">Delete</th>
      </tr>
    </thead>

    {/* Filter Row */}
    {showFilter && (
      <tbody>
        <tr className="bg-white">
          {[...Array(6)].map((_, i) => (
            <td key={i} className="p-0 border-end">
              <Form.Control
                size="sm"
                placeholder="Filter..."
                className="border-0 rounded-0 w-100 shadow-none"
              />
            </td>
          ))}
        </tr>
      </tbody>
    )}

    {/* Data or Empty State */}
    <tbody>
      {workLogData.length > 0 ? (
        workLogData.map((row, index) => (
          <tr key={index} className="border-top">
            <td className="px-3 py-2 border-end text-primary cursor-pointer">
              <div className="d-flex align-items-center">
                <ChevronRight size={16} className="me-1" />
                {row.record}
              </div>
            </td>
            <td className="px-3 py-2 border-end">{row.description}</td>
            <td className="px-3 py-2 border-end">{row.class}</td>
            <td className="px-3 py-2 border-end">{row.status}</td>
            <td className="px-3 py-2 border-end">{row.relationship}</td>
            <td className="px-3 py-2 text-center">
              <Button
                variant="link"
                size="sm"
                onClick={() => handleDeleteRow(index)}
                className="text-danger p-0 delete-btn"
              >
                <Trash2 size={18} />
              </Button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="6" className="text-center py-4">
            <div
              className="text-muted fw-semibold"
              style={{
                animation: "fadeIn 0.4s ease-in-out",
              }}
            >
              There are no rows to display.
            </div>
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</div>

 
           {/* Footer */}
           <Card.Footer className="bg-white border-0 py-3">
             <div className="d-flex justify-content-end gap-3">
               <Button
                 variant="outline-primary"
                 size="sm"
                 className="custom-btn-outline"
               >
                 Select Work Order
               </Button>
               <Button
                 variant="primary"
                 size="sm"
                 className="new-fancy-row-btn"
               >
                 New Row
               </Button>
             </div>
           </Card.Footer>
         </Card.Body>
       </Card>
     </Container>
   );
}

export default CreateSRRelatedWO
