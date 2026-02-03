import { Modal, Button, Form } from "react-bootstrap";
import "../Style/ReportsModal.css";
import { useState, useEffect } from "react";

const FormsModal = ({ show, onHide, apiReportsName }) => {
  const [dataReport, setDataReport] = useState([]);
  const [formValues, setFormValues] = useState({}); // store label=value pairs

  useEffect(() => {
    if (Array.isArray(apiReportsName) && apiReportsName.length > 0) {
      const reportLookup = apiReportsName[0]["spi:reportlookup"];
      if (Array.isArray(reportLookup)) {
        setDataReport(reportLookup);

        // Initialize form values with empty strings
        const initialValues = {};
        reportLookup.forEach((item) => {
          initialValues[item["spi:labeloverride"]] = "";
        });
        setFormValues(initialValues);
      }
    }
  }, [apiReportsName]);

  const handleInputChange = (label, value) => {
    setFormValues((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleSubmit = async () => {
    // console.log("Form Submitted:", formValues);

    // Extract the values in the order of dataReport
    const valuesArray = dataReport.map(
      (item) => formValues[item["spi:labeloverride"]] || ""
    );

    // Expecting at least 2 values: status and siteId
    const statusValue = valuesArray[0];
    const siteIdValue = valuesArray[1];

    // Build API URL dynamically
        // const apiUrl = `http://192.168.0.51:9080/maximo/oslc/os/mxapiwodetail?action=genreport&reportname=wotrackstatus.rptdesign&lean=1&oslc.where=status=%22${statusValue}%22%20AND%20SITEID=%22${siteIdValue}%22&_lid=maxadmin&_lpwd=maxadmin`;

    const apiUrl = `http://192.168.0.73:9080/maximo/oslc/os/mxapiwodetail?action=genreport&reportname=wotrackstatus.rptdesign&lean=1&oslc.where=status=%22${statusValue}%22%20AND%20SITEID=%22${siteIdValue}%22&_lid=maxadmin&_lpwd=maxadmin`;
    window.open(apiUrl)



    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton className="modal-header-custom">
        <Modal.Title>Fill the Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="model-content-form">
          {dataReport.length > 0 ? (
            dataReport.map((item, index) => {
              const label = item["spi:labeloverride"];
              return (
                <Form.Group
                  key={item.id || index}
                  controlId={`form-${index}`}
                  className="mb-3"
                >
                  <Form.Label>{label}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter value"
                    value={formValues[label] || ""}
                    onChange={(e) => handleInputChange(label, e.target.value)}
                  />
                </Form.Group>
              );
            })
          ) : (
            <p>No form fields available</p>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="outline-secondary" onClick={onHide}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FormsModal;
