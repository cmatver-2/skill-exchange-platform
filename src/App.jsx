import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;