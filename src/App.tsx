import { BrowserRouter, Routes, Route } from "react-router-dom";
import Organization from "@/pages/OrganizationHome";
import ProtectedRoute from "@/components/protected-routes/protected-route";
import { Providers } from "@/lib/providers/providers";
import { LandingPage } from "./pages/Landing";
import { Detection } from "./pages/Detection";
import AddProctor from "./pages/AddProctor";
import { FacialAuthRegister } from "./components/ai-validation/facial-auth-register";

function App() {
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
            path="/organization/createProctor"
            element={
              <ProtectedRoute>
                <AddProctor />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
