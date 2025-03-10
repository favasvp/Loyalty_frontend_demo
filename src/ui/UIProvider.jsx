import { createContext, useContext, useEffect } from "react";
import useUiStore, { selectTheme } from "../store/ui";

// Create context
const UIContext = createContext(null);

// UI Provider component
export function UIProvider({ children }) {
  const theme = useUiStore(selectTheme);

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Toast notification system
  const toasts = useUiStore((state) => state.toasts);
  const removeToast = useUiStore((state) => state.removeToast);

  // Auto-remove toasts after 5 seconds
  useEffect(() => {
    const timers = toasts.map((toast) => {
      return setTimeout(() => {
        removeToast(toast.id);
      }, 5000);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [toasts, removeToast]);

  return (
    <UIContext.Provider value={useUiStore}>
      {children}

      {/* Toast notifications */}
      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`rounded-lg shadow-lg p-4 flex items-center justify-between ${
                toast.type === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : toast.type === "error"
                  ? "bg-red-100 text-red-800 border border-red-200"
                  : toast.type === "warning"
                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  : "bg-blue-100 text-blue-800 border border-blue-200"
              }`}
            >
              <p>{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </UIContext.Provider>
  );
}

// Custom hook to use UI context
export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
