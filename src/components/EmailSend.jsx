import React, { useState } from "react";

const EmailSend = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!email || !email.includes("@")) {
      setStatus("⚠️ من فضلك أدخل بريد إلكتروني صحيح.");
      return;
    }

    setIsLoading(true);
    setStatus("⏳ جارٍ إرسال الإيميل...");

    try {
      const response = await fetch("http://localhost:5000/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus("✅ تم الإرسال بنجاح! تحقق من صندوق الوارد.");
        setEmail(""); // مسح الإيميل بعد النجاح
      } else {
        // رسالة الخطأ تأتي من الخادم (مثل: فشل في المصادقة)
        setStatus(`❌ فشل الإرسال: ${data.message || "خطأ غير معروف"}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("🚨 خطأ في الاتصال بالخادم. تأكد من تشغيله على منفذ 5000.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.header}>✉️ نظام إرسال الإشعارات</h2>

      <div style={styles.inputGroup}>
        <label style={styles.label}>البريد الإلكتروني المستهدف:</label>
        <input
          type="email"
          placeholder="أدخل بريد المستلم"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          disabled={isLoading}
            autoComplete="off"
        />
      </div>

      <button onClick={handleSend} style={styles.button} disabled={isLoading}>
        {isLoading ? (
          <span style={styles.loader}>جارٍ الإرسال...</span>
        ) : (
          "إرسال إشعار ثابت"
        )}
      </button>

      {status && (
        <p style={{ 
            ...styles.statusMessage, 
            backgroundColor: status.includes("✅") ? '#d4edda' : status.includes("❌") ? '#f8d7da' : '#fff3cd',
            color: status.includes("✅") ? '#155724' : status.includes("❌") ? '#721c24' : '#856404',
        }}>
          {status}
        </p>
      )}
    </div>
  );
};

// 🎨 التنسيقات (CSS-in-JS)
const styles = {
  card: {
    width: "400px",
    margin: "50px auto",
    padding: "30px",
    textAlign: "center",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
    direction: "rtl",
    fontFamily: "Arial, sans-serif",
    border: "1px solid #eee",
  },
  header: {
    color: "#343a40",
    marginBottom: "25px",
    borderBottom: "2px solid #007bff",
    paddingBottom: "10px",
  },
  inputGroup: {
    marginBottom: "20px",
    textAlign: "right",
  },
  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: "bold",
    color: "#495057",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    border: "1px solid #ced4da",
    borderRadius: "8px",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "12px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
    marginTop: "15px",
  },
  statusMessage: {
    marginTop: "25px",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "15px",
    border: "1px solid transparent",
  },
  loader: {
    display: "inline-block",
  }
};

export default EmailSend;