import { useState } from "react";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./components/LandingPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LandingPage />
    </QueryClientProvider>
  );
}

export default App;
