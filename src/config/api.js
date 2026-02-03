// api.js

export const API_BASE =
  import.meta.env.DEV
    ? "/api" // أثناء التطوير → استخدم proxy
    : "http://192.168.0.73:9080"; // الإنتاج Tomcat

// مثال API URLs
export const LOGIN_API = `${API_BASE}/maximo/oslc/LOGIN`;    // Login Api
export const Total_SR_API = `${API_BASE}/maxrest/oslc/os/PORTALSR`;  // Total SR Api
export const Due_SR_API = `${API_BASE}/maxrest/oslc/os/PORTALWFASSIGN`;   // Due SR Api
export const SR_API = `${API_BASE}/maxrest/oslc/os/PORTALSR`;   // SR Details Api
export const Create_SR_API = `${API_BASE}/maxrest/oslc/os/PORTALSR`;   // SR Details Api
export const Update_SR_API = `${API_BASE}/maxrest/oslc/os/MXSR`;   // SR Details Api


