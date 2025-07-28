import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import EnhancedDashboard from "./pages/EnhancedDashboard";
import EnhancedLanding from "./pages/EnhancedLanding";
import TestPage from "./pages/TestPage";
import Auth from "./pages/Auth";
import Demo from "./pages/Demo";
import Contact from "./pages/Contact";
import ContractorDashboard from "./pages/ContractorDashboard";
import MaterialRequests from "./pages/MaterialRequests";
import ImageUpload from "./pages/ImageUpload";
import CreateProject from "./pages/CreateProject";
import TeamManagement from "./pages/TeamManagement";
import AlertsNotifications from "./pages/AlertsNotifications";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/SettingsPage";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<EnhancedLanding />} />
            <Route path="/landing" element={<EnhancedLanding />} />
            <Route path="/test" element={<TestPage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <EnhancedDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard-classic" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/contractor-dashboard" element={
              <ProtectedRoute>
                <ContractorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/material-requests" element={
              <ProtectedRoute>
                <MaterialRequests />
              </ProtectedRoute>
            } />
            <Route path="/upload-images" element={
              <ProtectedRoute>
                <ImageUpload />
              </ProtectedRoute>
            } />
            <Route path="/create-project" element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            } />
            <Route path="/team-management" element={
              <ProtectedRoute>
                <TeamManagement />
              </ProtectedRoute>
            } />
            <Route path="/alerts" element={
              <ProtectedRoute>
                <AlertsNotifications />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/messages" element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
