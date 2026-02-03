import React, { useEffect, useRef } from "react";

const AutodeskViewer = ({ urn, token }) => {
  const viewerDiv = useRef(null);
  const viewerInstance = useRef(null);

  useEffect(() => {
    if (!urn || !token) return;

    // تأكد أن سكريبتات Autodesk تم تحميلها
    const options = {
      env: "AutodeskProduction",
      accessToken: token,
    };

    window.Autodesk.Viewing.Initializer(options, () => {
      if (viewerInstance.current) return;

      const viewer = new window.Autodesk.Viewing.GuiViewer3D(viewerDiv.current);
      viewer.start();

      const documentId = `urn:${urn}`;
      window.Autodesk.Viewing.Document.load(
        documentId,
        (doc) => {
          const defaultModel = doc.getRoot().getDefaultGeometry();
          viewer.loadDocumentNode(doc, defaultModel);
        },
        (err) => console.error("❌ Load error:", err)
      );

      viewerInstance.current = viewer;
    });

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.finish();
        viewerInstance.current = null;
      }
    };
  }, [urn, token]);

  return (
    <div
      ref={viewerDiv}
      id="forgeViewer"
      style={{
        width: "100%",
        height: "80vh",
        backgroundColor: "#f3f3f3",
        borderRadius: "12px",
      }}
    />
  );
};

export default AutodeskViewer;
