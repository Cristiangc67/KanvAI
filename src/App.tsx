import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  /* const { isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  } */

  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}

export default App;
