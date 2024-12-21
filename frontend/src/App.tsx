import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { Home } from "./components/Home";
import { UserNav } from "./components/navbar";
import { Sidebar } from "./components/sidebar";

function App() {
  return (
    <div className="text-lg">
      <Router>
        <div className="flex h-screen w-screen">
          <Sidebar />
          <div className="w-full md:w-4/5">
            <UserNav />
            <Routes>
              <Route path="/students" element={<Home />} />
              <Route path="/" element={<Navigate to="/students" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
      <Toaster />
    </div>
  );
}

export default App;
