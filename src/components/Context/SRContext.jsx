import React, { createContext, useContext, useEffect, useState } from "react";
import { Due_SR_API, Total_SR_API } from "../../config/api";
import { useFetch } from "../../hooks/getFetch";

export const SRContext = createContext();

export const SRProvider = ({ children }) => {

  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);

  // ✅ Get start & finish of current day
  const getStartDate = () => {
    const date = new Date();
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T00:00:00"
    );
  };

  const getFinishDate = () => {
    const date = new Date();
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, "0");
    return (
      date.getFullYear() +
      "-" +
      pad(date.getMonth() + 1) +
      "-" +
      pad(date.getDate()) +
      "T23:59:59"
    );
  };

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("UserInfo");
    if (storedUserInfo) {
      const { username, password } = JSON.parse(storedUserInfo);
      setUserName(username);
      setPassword(password);
    }
    setStartDateTime(getStartDate());
    setEndDateTime(getFinishDate());
  }, []);

   // ====== BUILD URLS SAFELY ======
  const srUrl =
    userName && password
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALSR?lean=1&oslc.select=*&oslc.where=REPORTEDBY=%22HELPDESK1%22&_lid=${userName}&_lpwd=${password}`
      : null;

  const wfUrl =
    userName && password && startDateTime
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3C%22${startDateTime}%22&_lid=${userName}&_lpwd=${password}`
      : null;

  const dueUrl =
    userName && password && startDateTime && endDateTime
      ? `http://192.168.0.73:9080/maxrest/oslc/os/PORTALWFASSIGN?lean=1&oslc.select=*&oslc.where=sr.targetfinish%3E=%22${startDateTime}%22%20and%20sr.targetfinish%3C=%22${endDateTime}%22&_lid=${userName}&_lpwd=${password}`
      : null;

  // ====== FETCH DATA USING CUSTOM HOOK ======
  const { data: sRData, loading: srLoading, error: srError } = useFetch(srUrl);
  const { data: wfSRData, loading: wfSrLoading, error: wfSrError } = useFetch(wfUrl);
  const { data: dueDay, loading: dDSrLoading, error: dDSrError } = useFetch(dueUrl);
// console.log("allSRData context: ",sRData)
// console.log("allWFOverdue context: ",wfSRData)
// console.log("allWFDueToday context: ",dueDay)
// console.log("UserName: ",userName)
// console.log("Password: ",password)

  return (
  <>
  <SRContext.Provider
  value={{sRData,
        wfSRData,
        dueDay,
        // loading
        srLoading,
        wfSrLoading,
        dDSrLoading,

        // errors
        srError,
        wfSrError,
        dDSrError,
}}
  >
    {children}
  </SRContext.Provider>
  
  </>
);
};

export const useSR= ()=> useContext(SRContext)
