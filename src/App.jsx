// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;