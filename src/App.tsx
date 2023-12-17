import ProtectedRoute from "@/components/protected-routes/protected-route";
import { Providers } from "@/lib/providers/providers";
import Organization from "@/pages/Organization/OrganizationHome";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import socketIO from "socket.io-client";
import { FacialAuthRegister } from "./components/ai-validation/facial-auth-register";
import { LandingPage } from "./pages/Landing";
import ViewProctors from "./pages/Organization/ViewProctors";
const ws = import.meta.env.VITE_APP_API_HOST;

import Exam from "./pages/Organization/Exam";
import Room from "./components/meet/room";
import { Join } from "./components/meet/join";
import Questions from "./pages/Organization/questions";
import Students from "./pages/Organization/students";
import ProctorStreamPannel from "./pages/Proctor/proctor-stream-pannel";
import StudentExam from "./pages/Student/student-exam";
import SystemPermissionCheck from "./pages/Student/system-permission-check";
import { useToast } from "./components/ui/use-toast";

// TODO: Routes Seperated into different files according to the access level
function App() {
  const { toast } = useToast();
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
            path="/proctor/:id/stream"
            element={
              <ProtectedRoute>
                <ProctorStreamPannel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:id/system-check"
            element={
              <ProtectedRoute>
                <SystemPermissionCheck />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:id/start"
            element={
              <ProtectedRoute>
                <StudentExam />
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
            path="/organization/questions"
            element={
              <ProtectedRoute>
                <Questions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/organization/students"
            element={
              <ProtectedRoute>
                <Students />
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
