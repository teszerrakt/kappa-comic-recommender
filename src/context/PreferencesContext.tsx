import type { PropsWithChildren } from "react";
import { createContext, useContext } from "react";
import { LOCAL_STORAGE } from "../constant";
import useStorage from "../Hooks/useStorage";
import type { UserPreference } from "../types";

interface PreferencesContextType {
  prefs: UserPreference[];
  setPrefs: React.Dispatch<React.SetStateAction<UserPreference[]>>;
}

const PreferencesContext = createContext<PreferencesContextType | null>(null);

export const PreferencesProvider = ({ children }: PropsWithChildren) => {
  const [prefs, setPrefs] = useStorage<UserPreference[]>(
    LOCAL_STORAGE.USER_PREFERENCES,
    [],
    "local",
  );
  return (
    <PreferencesContext.Provider value={{ prefs, setPrefs }}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
};
