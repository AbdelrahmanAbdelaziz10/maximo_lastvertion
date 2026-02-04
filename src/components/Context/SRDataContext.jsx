import { createContext, useContext, useMemo, useState } from "react";

const SRDataContext = createContext(undefined);

export const SRDataProvider = ({ children }) => {
  const [srData, setSrData] = useState([]);
  const [tableTitle, setTableTitle] = useState("");

  const value = useMemo(
    () => ({
      srData,
      setSrData,
      tableTitle,
      setTableTitle,
    }),
    [srData, tableTitle]
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