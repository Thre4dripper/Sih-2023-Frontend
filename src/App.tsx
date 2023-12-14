import { BrowserRouter, Routes, Route } from "react-router-dom";
import Organization from "@/pages/OrganizationHome";
import ProtectedRoute from "@/components/protected-routes/protected-route";
import { Providers } from "@/lib/providers/providers";
import { LandingPage } from "./pages/Landing";
import { Detection } from "./pages/Detection";
import AddProctor from "./pages/AddProctor";
import { FacialAuthRegister } from "./components/ai-validation/facial-auth-register";
import socketIO from "socket.io-client";
import { useEffect } from "react";

const ws = import.meta.env.VITE_APP_API_HOST;
import ViewProctors from "./pages/ViewProctors";

function App() {
  useEffect(() => {
    const socket = socketIO(ws);
    console.log("socket connected", socket);
  }, []);
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <LandingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/dashboard"
            element={
              <ProtectedRoute>
                <Organization />
              </ProtectedRoute>
            }
          />
          <Route
            path="/check"
            element={
              <ProtectedRoute>
                <FacialAuthRegister />
                {/* <Detection /> */}
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/allProctors"
            element={
              <ProtectedRoute>
                <ViewProctors />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
