import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type AccessibilityMode = "deaf" | "no-arms" | "dyslexic" | "neuro" | "no-blue-light";

interface AccessibilityState {
  modes: Record<AccessibilityMode, boolean>;
  toggleMode: (mode: AccessibilityMode) => void;
  resetAll: () => void;
  isAnyActive: boolean;
}

const defaultModes: Record<AccessibilityMode, boolean> = {
  deaf: false,
  "no-arms": false,
  dyslexic: false,
  neuro: false,
  "no-blue-light": false,
};

const AccessibilityContext = createContext<AccessibilityState>({
  modes: defaultModes,
  toggleMode: () => {},
  resetAll: () => {},
  isAnyActive: false,
});

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [modes, setModes] = useState<Record<AccessibilityMode, boolean>>(() => {
    try {
      const saved = localStorage.getItem("pawsitting-a11y");
      return saved ? JSON.parse(saved) : defaultModes;
    } catch {
      return defaultModes;
    }
  });

  useEffect(() => {
    localStorage.setItem("pawsitting-a11y", JSON.stringify(modes));
    const root = document.documentElement;
    root.classList.toggle("a11y-deaf", modes.deaf);
    root.classList.toggle("a11y-no-arms", modes["no-arms"]);
    root.classList.toggle("a11y-dyslexic", modes.dyslexic);
    root.classList.toggle("a11y-neuro", modes.neuro);
    root.classList.toggle("a11y-no-blue-light", modes["no-blue-light"]);
  }, [modes]);

  const toggleMode = useCallback((mode: AccessibilityMode) => {
    setModes((prev) => ({ ...prev, [mode]: !prev[mode] }));
  }, []);

  const resetAll = useCallback(() => {
    setModes(defaultModes);
  }, []);

  const isAnyActive = Object.values(modes).some(Boolean);

  return (
    <AccessibilityContext.Provider value={{ modes, toggleMode, resetAll, isAnyActive }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
