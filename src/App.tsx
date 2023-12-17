import ProtectedRoute from "@/components/protected-routes/protected-route";
import { Providers } from "@/lib/providers/providers";
import Organization from "@/pages/Organization/OrganizationHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Detection } from "./pages/Detection";
import { FacialAuthRegister } from "./components/ai-validation/facial-auth-register";
import socketIO from "socket.io-client";
import { useEffect } from "react";
const ws = import.meta.env.VITE_APP_API_HOST;
import { LandingPage } from "./pages/Landing";
import ViewProctors from "./pages/Organization/ViewProctors";

import Exam from "./pages/Organization/Exam";
import { Meet } from "./pages/Meet";
import Room from "./components/meet/room";
import { Join } from "./components/meet/join";

// TODO: Routes Seperated into different files according to the access level
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
            path="/organization/exams"
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
          {/* created nested routes for meet and meet id */}
          <Route path="/join" element={<Join />} />
          <Route path="/room/:id" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
