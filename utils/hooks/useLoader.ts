import { LoaderContext } from "@/contex/LoaderContext";
import { useContext } from "react";

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("Deve ser retornado em um context.");
  }
  return context;
};
