import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LandingPage from "./components/LandingPage";
import "./components/Global.css";
import { Route, Routes } from "react-router-dom";
import SearchResults from "./components/SearchResults";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="search-result/:busStopNumber"
          element={<SearchResults />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
