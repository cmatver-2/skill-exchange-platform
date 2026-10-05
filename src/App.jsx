import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Navbar />
        <main className="app-main">
          <AppRoutes />
        </main>
        <Footer />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;