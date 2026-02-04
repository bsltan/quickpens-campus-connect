import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ModeProvider } from "./contexts/ModeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import RedirectIfAuthenticated from "./components/auth/RedirectIfAuthenticated";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ResetPassword from "./components/auth/ResetPassword";
import Profile from "./components/Profile";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

import PostAssignment from "./pages/PostAssignment";
import BecomeWriter from "./pages/BecomeWriter";
import StudentDashboard from "./pages/StudentDashboard";
import WriterDashboard from "./pages/WriterDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ModeProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>

                {/* Public */}
                <Route path="/" element={
                  <RedirectIfAuthenticated>
                    <Index />
                  </RedirectIfAuthenticated>
                } />

                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Your NEW Routes */}
                <Route path="/post-assignment" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <PostAssignment />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/become-writer" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <BecomeWriter />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/student-dashboard" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <StudentDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/writer-dashboard" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <WriterDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/admin-dashboard" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <AdminDashboard />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                {/* Existing Dashboard */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Home />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                <Route path="/profile" element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Profile />
                    </MainLayout>
                  </ProtectedRoute>
                } />

                {/* Catch All */}
                <Route path="*" element={<NotFound />} />

              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </ModeProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
