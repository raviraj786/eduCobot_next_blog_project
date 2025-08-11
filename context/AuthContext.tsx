"use client";

import React, { createContext, useState, ReactNode } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

export function AuthProvider({
  children,
  initialIsLoggedIn = false,
}: {
  children: ReactNode;
  initialIsLoggedIn?: boolean;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}
