import ProtectedRoute from "@/components/protected-routes/protected-route";
import { Providers } from "@/lib/providers/providers";
import Organization from "@/pages/Organization/OrganizationHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detection } from "./pages/Detection";
import { LandingPage } from "./pages/Landing";
import AddProctor from "./pages/Organization/AddProctor";
import Exam from "./pages/Organization/Exam";

// TODO: Routes Seperated into different files according to the access level
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
            path="/organization/createExam"
            element={
              <ProtectedRoute>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path="/check"
            element={
              <ProtectedRoute>
                <Detection />
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
