import { createContext, useContext, useMemo, useState, useEffect } from "react";

const SRDataContext = createContext(undefined);

export const SRDataProvider = ({ children }) => {
  const [srData, setSrData] = useState([]);
  const [tableTitle, setTableTitle] = useState("");

  // ✅ اقرأ أول قيمة من localStorage
  const [currentSrId, setCurrentSrId] = useState(() => {
    return localStorage.getItem("srId") || null;
  });

  // ✅ أي تغيير يتخزن في localStorage
  useEffect(() => {
    if (currentSrId) {
      localStorage.setItem("srId", currentSrId);
    }
  }, [currentSrId]);

  const value = useMemo(
    () => ({
      srData,
      setSrData,
      tableTitle,
      setTableTitle,
      currentSrId,
      setCurrentSrId,
    }),
    [srData, tableTitle, currentSrId]
  );

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
