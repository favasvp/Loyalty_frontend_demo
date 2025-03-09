import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./routes/Router.jsx";
import { UIProvider } from "./ui/UIProvider";
import { ToastContainer } from 'react-toastify';
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UIProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UIProvider>
    </QueryClientProvider>
  </StrictMode>
);
