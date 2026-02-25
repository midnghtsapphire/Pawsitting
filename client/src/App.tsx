import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import CityLanding from "./pages/CityLanding";
import ReportCards from "./pages/ReportCards";
import PetCam from "./pages/PetCam";
import Dashboard from "./pages/Dashboard";
import { AccessibilityProvider } from "./contexts/AccessibilityContext";
import AccessibilityPanel from "./components/AccessibilityPanel";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/services/:category" component={Services} />
      <Route path="/booking" component={Booking} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/about" component={About} />
      <Route path="/report-cards" component={ReportCards} />
      <Route path="/report-cards/:id" component={ReportCards} />
      <Route path="/pet-cam" component={PetCam} />
      <Route path="/pet-cam/:bookingId" component={PetCam} />
      <Route path="/dashboard" component={Dashboard} />
      {/* SEO City Landing Pages */}
      <Route path="/pet-sitting-wellington-co" component={() => <CityLanding city="wellington" />} />
      <Route path="/pet-sitting-fort-collins-co" component={() => <CityLanding city="fort-collins" />} />
      <Route path="/pet-sitting-loveland-co" component={() => <CityLanding city="loveland" />} />
      <Route path="/pet-sitting-evans-co" component={() => <CityLanding city="evans" />} />
      <Route path="/pet-sitting-timnath-co" component={() => <CityLanding city="timnath" />} />
      <Route path="/pet-sitting-berthoud-co" component={() => <CityLanding city="berthoud" />} />
      <Route path="/farm-animal-sitting-northern-colorado" component={() => <CityLanding city="noco-farm" />} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AccessibilityProvider>
          <TooltipProvider>
            <Toaster />
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
            <ChatWidget />
            <AccessibilityPanel />
          </TooltipProvider>
        </AccessibilityProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
