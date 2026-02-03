import React, { useState } from "react";
import { CloudUpload, X } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateAttachment = ({ assetNum = "ASSET001", RowDataSr, document })  => {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const [docInfoId, setDocInfoId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Get user info safely from localStorage
  const userInfo = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = userInfo?.maxuser?.[0]?.loginid || "maxadmin";
  const password = userInfo?.cardId || "maxadmin";

  // ✅ 1️⃣ POST to Maximo to create DOCINFO and extract DOCINFOID
  const postToMaximo = async (url) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, { method: "POST" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const xmlText = await response.text(); // XML response
      // console.log("Maximo XML:", xmlText);

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, "application/xml");
      const docInfoIdValue =
        xmlDoc.getElementsByTagName("DOCINFOID")[0]?.textContent || null;

      // console.log("Extracted DOCINFOID:", docInfoIdValue);
      setDocInfoId(docInfoIdValue);
      return docInfoIdValue;
    } catch (err) {
      console.error("Post error:", err);
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // ✅ 2️⃣ POST to PORTALDOCLINKS API after DOCINFOID is retrieved
  const postToPortalDoclinks = async (docInfoId, filename, docType) => {
    const urlTwo = `http://192.168.0.73:9080/maximo/api/script/PORTALDOCLINKS?_lid=maxadmin&_lpwd=maxadmin`;

    const payload = {
      "doctype": docType,
      "docinfoid": parseInt(docInfoId, 10),
      "document": filename,
      "ownertable": document,
      "ownerid": RowDataSr?.[0]?.ticketuid,
    };
  

    // console.log("📦 Payload:", payload);

    try {
      const response = await fetch(urlTwo, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response; // can be XML or text
      // console.log(" PORTALDOCLINKS Response:", result);
    } catch (error) {
      console.error("❌ Error posting to PORTALDOCLINKS:", error);
    }
  };

  // ✅ Upload, post to DOCINFO, then link via PORTALDOCLINKS
  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("assetNum", assetNum);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("File upload failed");

      const result = await response.json();
      const filename = result.file.filename;
      const filePath = result.file.path;

      const extension = filename.split(".").pop().toLowerCase();
      const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "webp"];
      const docType = imageExtensions.includes(extension)
        ? "Attachments"
        : "Attachments";

      const encodedFilePath = encodeURIComponent(filePath);

      const url =
        `http://192.168.0.73:9080/maxrest/rest/mbo/docinfo?_action=addchange` +
        `&document=${document}document` +
        `&description=${filename}` +
        `&application=${document}` +
        `&URLTYPE=FILE` +
        `&URLNAME=${encodedFilePath}` +
        `&doctype=${docType}` +
        `&_lid=${username}` +
        `&_lpwd=${password}` +
        `&newurlname=${encodedFilePath}`;

      // console.log("📡 Maximo DOCINFO URL:", url);

      // 1️⃣ Post to DOCINFO to get DOCINFOID
      const docId = await postToMaximo(url);

      if (docId) {
        // 2️⃣ Post to PORTALDOCLINKS
        await postToPortalDoclinks(docId, filename, docType);
      }

      setUploadStatus((prev) => ({
        ...prev,
        [file.name]: "✅ Uploaded and linked to Maximo",
      }));
    } catch (error) {
      console.error("⚠️ Upload/Post error:", error);
      setUploadStatus((prev) => ({
        ...prev,
        [file.name]: "❌ Failed to upload or post",
      }));
    }
  };

  // ✅ Input Handlers
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    selectedFiles.forEach(handleFileUpload);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
    droppedFiles.forEach(handleFileUpload);
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ UI
  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className="attachment text-center p-5 rounded-3"
      style={{
        borderStyle: "dotted",
        borderWidth: "2px",
        borderColor: isDragging ? "#007bff" : "#ced4da",
        backgroundColor: isDragging ? "#f8f9ff" : "#fdfdfd",
        transition: "0.3s",
        marginTop: "20px",
      }}
    >
      <CloudUpload size={60} color="#007bff" />
      <h6 className="mt-3 mb-2 fw-semibold text-dark">
        Drag & Drop files here or
      </h6>

      <label className="btn btn-primary px-4 mt-2" style={{ cursor: "pointer" }}>
        Browse Files
        <input
          type="file"
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-4 text-start">
          <h6 className="fw-bold mb-2 text-secondary">Uploaded Files:</h6>
          <ul className="list-group list-group-flush">
            {files.map((file, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  📎 {file.name}{" "}
                  <small className="text-muted">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </small>{" "}
                  <span className="ms-2">
                    {uploadStatus[file.name] || "⏳ Uploading..."}
                  </span>
                </div>
                <X
                  size={20}
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => handleRemoveFile(index)}
                />
              </li>
            ))}
          </ul>

          {loading && (
            <p className="mt-2 text-primary">🔄 Posting to Maximo...</p>
          )}
          {docInfoId && (
            <p className="mt-2 text-success">
              ✅ DOCINFOID Created: <b>{docInfoId}</b>
            </p>
          )}
          {error && <p className="mt-2 text-danger">⚠️ {error}</p>}
        </div>
      )}
    </div>
  );
};

export default CreateAttachment
