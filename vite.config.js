// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
//   base: "/", // 👈 مهم
//   server: {
//     port: 3000,
//     proxy: {
//       "/maximo": {
//         target: "http://192.168.0.73:9080",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });






import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  base: "/maximo/", // match your Tomcat context path if deploying there
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  server: {
    host: "0.0.0.0", // allows access from LAN IPs
    port: 3000,      // you can change if needed
  },
 

});



// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
//   base: "/", // لو حتنشر على Tomcat تحت context path /maximo
//   build: {
//     outDir: "dist",
//     assetsDir: "assets",
//   },
//   server: {
//     host: "0.0.0.0",
//     port: 3000,
//     proxy: {
//       // كل الطلبات اللي تبدا بـ /maximo هتروح لـ Tomcat
//       "/maximo": {
//         target: "http://192.168.0.73:9080",
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/maximo/, "/maximo"),
//       },
//     },
//   },
// });
