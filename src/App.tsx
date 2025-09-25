import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/destinos" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Explorar Destinos</h1></div>
            </DashboardLayout>
          } />
          <Route path="/mis-viajes" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Mis Viajes</h1></div>
            </DashboardLayout>
          } />
          <Route path="/reservas" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Reservas</h1></div>
            </DashboardLayout>
          } />
          <Route path="/ofertas" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Ofertas Especiales</h1></div>
            </DashboardLayout>
          } />
          <Route path="/favoritos" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Favoritos</h1></div>
            </DashboardLayout>
          } />
          <Route path="/tickets" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Tickets</h1></div>
            </DashboardLayout>
          } />
          <Route path="/perfil" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Mi Perfil</h1></div>
            </DashboardLayout>
          } />
          <Route path="/configuracion" element={
            <DashboardLayout>
              <div className="p-6"><h1 className="text-2xl font-bold">Configuración</h1></div>
            </DashboardLayout>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
