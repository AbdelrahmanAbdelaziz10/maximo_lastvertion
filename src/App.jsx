import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./components/Context/SidebarContext";

function App() {
  return (
    <SidebarProvider>
      <Outlet />
    </SidebarProvider>
  );
}

export default App;
