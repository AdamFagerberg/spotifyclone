"use client";

import { createContext, useContext, useState } from "react";

const DeviceContext = createContext();

export const useDevice = () => useContext(DeviceContext);

export function DeviceProvider({ children }) {
  const [currentDeviceId, setCurrentDeviceId] = useState(null);

  return (
    <DeviceContext.Provider value={{ currentDeviceId, setCurrentDeviceId }}>
      {children}
    </DeviceContext.Provider>
  );
}
