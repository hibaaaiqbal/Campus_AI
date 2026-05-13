import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const refreshUser = async () => {
    try {
      setLoadingUser(true);
      const res = await fetch("/api/student/me", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        setCurrentUser(null);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setCurrentUser(data.data);
      } else {
        setCurrentUser(null);
      }
    } catch (err) {
      setCurrentUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ currentUser, setCurrentUser, refreshUser, loadingUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
