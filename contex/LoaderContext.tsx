import Loader from "@/components/Loader";
import { createContext, ReactNode, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

type LoaderContextTP = {
  showLoader: () => void;
  hideLoader: () => void;
};

type LoaderContextProvider = {
  children: ReactNode;
};

export const LoaderContext = createContext<LoaderContextTP | undefined>(
  undefined
);

export const LoaderProvider = ({ children }: LoaderContextProvider) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const contextValue: LoaderContextTP = {
    showLoader: () => {
      setIsVisible(true);
    },
    hideLoader: () => {
      setIsVisible(false);
    },
  };

  return (
    <LoaderContext.Provider value={contextValue}>
      {isVisible && <Loader />}
      <SafeAreaProvider style={{ position: "relative" }}>
        {children}
      </SafeAreaProvider>
    </LoaderContext.Provider>
  );
};
