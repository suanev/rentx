import React from "react";
import { AuthProvider, AuthProviderProps } from "./auth";

const AppProvider = ({ children }: AuthProviderProps) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
