import { Switch, Route } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePremium from "@/pages/home-premium";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePremium} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // fire-and-forget visit notification on mount
  useEffect(() => {
    try {
      const body = {
        path: window.location.pathname + window.location.search,
        referrer: document.referrer,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screen: `${window.screen.width}x${window.screen.height}`,
        userAgent: navigator.userAgent,
      };
      fetch('/api/visit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }).catch(() => {});
    } catch {}
  }, []);

  // Set dark mode by default for premium look
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
