import { Outlet } from "react-router-dom";
import { SidebarProvider } from "./components/Context/SidebarContext";
import { GlobalProvider } from "./components/Context/GlobalContext";

function App() {
  return (
    <SidebarProvider>
      <GlobalProvider>
        <Outlet />
      </GlobalProvider>
    </SidebarProvider>
  );
}

export default App;
