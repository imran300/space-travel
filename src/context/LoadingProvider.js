import React, { createContext, useState, useCallback } from "react";

// Initial context with default values
const INITIAL_LOADING_STATE = {
  isLoading: false,
  enableLoading: function () {},
  disableLoading: function () {},
};

// Create a context to manage loading state
export const LoadingContext = createContext(INITIAL_LOADING_STATE);

// A provider component for the LoadingContext
function LoadingProvider({ children }) {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(INITIAL_LOADING_STATE.isLoading);

  // Function to start loading state
  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  // Function to stop loading state
  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Provide loading state and functions to children components
  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        enableLoading: startLoading,
        disableLoading: stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingProvider;
