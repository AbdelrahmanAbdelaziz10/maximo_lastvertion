import React, { useState } from "react";

export default function UploadAndView() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setStatus("⏳ Uploading...");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      // console.log("📦 Response:", data);

      if (!data.urn) throw new Error("Upload failed!");

      const urn = data.urn;
      const imgUrl = `https://developer.api.autodesk.com/modelderivative/v2/designdata/${urn}/thumbnail?width=800&height=800`;

      setImageUrl(imgUrl);
      setStatus("✅ Conversion complete!");
    } catch (err) {
      console.error(err);
      setStatus("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>🧱 CAD to Image Converter</h2>
      <input type="file" onChange={handleUpload} />
      <p>{status}</p>

      {loading && <p>Processing...</p>}

      {imageUrl && (
        <div style={{ marginTop: 20 }}>
          <img
            src={imageUrl}
            alt="CAD Preview"
            style={{
              width: 400,
              border: "1px solid #ccc",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      )}
    </div>
  );
}
