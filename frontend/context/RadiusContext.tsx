"use client";

import React, { createContext, useContext, useState } from "react";

interface RadiusContextType {
  radiusKm: number;
  setRadiusKm: (value: number) => void;
}

const RadiusContext = createContext<RadiusContextType>({
  radiusKm: 100,
  setRadiusKm: () => {},
});

export const RadiusProvider = ({ children }: { children: React.ReactNode }) => {
  const [radiusKm, setRadiusKm] = useState(100);

  return (
    <RadiusContext.Provider value={{ radiusKm, setRadiusKm }}>
      {children}
    </RadiusContext.Provider>
  );
};

export const useRadius = () => useContext(RadiusContext);