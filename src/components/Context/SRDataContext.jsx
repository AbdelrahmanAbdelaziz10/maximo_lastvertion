import { createContext, useContext, useMemo, useState, useEffect } from "react";

const SRDataContext = createContext(undefined);

export const SRDataProvider = ({ children }) => {

  const [srData, setSrData] = useState(() => {
    const stored = localStorage.getItem("SR_LIST");
    return stored ? JSON.parse(stored) : [];
  });

  const [tableTitle, setTableTitle] = useState("");

  const [currentSrId, setCurrentSrId] = useState(() => {
    return localStorage.getItem("srId") || null;
  });

  useEffect(() => {
    if (currentSrId) {
      localStorage.setItem("srId", currentSrId);
    }
  }, [currentSrId]);

  // 🔥 مهم جداً
  useEffect(() => {
    if (srData.length > 0) {
      localStorage.setItem("SR_LIST", JSON.stringify(srData));
    }
  }, [srData]);

  const value = {
    srData,
    setSrData,
    tableTitle,
    setTableTitle,
    currentSrId,
    setCurrentSrId,
  };

  return (
    <SRDataContext.Provider value={value}>
      {children}
    </SRDataContext.Provider>
  );
};

export const useSRData = () => {
  const context = useContext(SRDataContext);
  if (!context) {
    throw new Error("useSRData must be used inside SRDataProvider");
  }
  return context;
};
