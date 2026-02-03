import React from "react";
import UploadAndView from "../../components/Viewer/UploadAndView";
import DXFViewer from "../../components/Viewer/AutodeskViewer";


const ViewerCad = () => {


  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>محول وعارض ملفات CAD</h1>
        <p style={styles.subtitle}>
          قم بتحويل ملفات DWG, DWF, UHD إلى صور وعرضها
        </p>
      </header>
      {/* <DXFViewer /> */}

      <UploadAndView  />
      

    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px',
  },
  title: {
    color: '#2c3e50',
    marginBottom: '10px',
    fontSize: '2.5rem',
  },
  subtitle: {
    color: '#7f8c8d',
    fontSize: '1.1rem',
  },
};

export default ViewerCad;