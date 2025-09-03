import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/layouts/AppLayout";
import Index from "./pages/Index";
import Templates from "./pages/Templates";
import Pricing from "./pages/Pricing";
import ApiDocs from "./pages/ApiDocs";
import SignIn from "./pages/SignIn";
import GetStarted from "./pages/GetStarted";
import ReceiptScanner from "./pages/ReceiptScanner";
import FinancialReportGenerator from "./pages/FinancialReportGenerator";
import ProfitLossCalculator from "./pages/ProfitLossCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/receipt-scanner" element={<ReceiptScanner />} />
            <Route path="/financial-reports" element={<FinancialReportGenerator />} />
            <Route path="/profit-loss-calculator" element={<ProfitLossCalculator />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/get-started" element={<GetStarted />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
