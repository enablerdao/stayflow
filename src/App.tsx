
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { LanguageProvider } from "@/hooks/use-language";
import { FeedbackProvider } from "@/hooks/use-feedback";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Reservations from "./pages/Reservations";
import PropertyRegister from "./pages/PropertyRegister";
import Properties from "./pages/Properties";
import Customers from "./pages/Customers";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import FeedbackButton from "./components/feedback/FeedbackButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <LanguageProvider>
        <FeedbackProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/property/register" element={<PropertyRegister />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/analytics" element={<Analytics />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <FeedbackButton />
            </BrowserRouter>
          </TooltipProvider>
        </FeedbackProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
