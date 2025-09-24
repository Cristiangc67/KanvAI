import supabase from "../supabase-client.ts";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  type User,
  type AuthError,
  type AuthResponse,
  type OAuthResponse,
  type Session,
} from "@supabase/supabase-js";

interface Profile {
  id: string;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  description: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  signUp: (email: string, password: string) => Promise<AuthResponse>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signInWithGoogle: () => Promise<OAuthResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
  handleLogout: () => void;
  loadProfile: (userId: string) => Promise<Profile | null>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

let isProfileLoading = false;
const PROFILE_STORAGE_KEY = "profile_data";
const SESSION_STORAGE_KEY = "session_data";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  });
  const [errorM, setErrorM] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const saveProfileToStorage = (profileData: Profile | null) => {
    if (typeof window !== "undefined") {
      if (profileData) {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
      } else {
        localStorage.removeItem(PROFILE_STORAGE_KEY);
      }
    }
  };

  const saveSessionToStorage = (sessionData: Session | null) => {
    if (typeof window !== "undefined") {
      if (sessionData) {
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
      } else {
        localStorage.removeItem(SESSION_STORAGE_KEY);
      }
    }
  };

  const getSessionFromStorage = (): Session | null => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(SESSION_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch {
        return null;
      }
    }
    return null;
  };

  const loadProfile = async (userId: string, forceRefresh: boolean = false) => {
    if (isProfileLoading && !forceRefresh) return null;

    isProfileLoading = true;

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error cargando profile:", error.message);
        setProfile(null);
        saveProfileToStorage(null);
        return null;
      }

      setProfile(data);
      saveProfileToStorage(data);
      return data;
    } catch (err) {
      console.error("Excepción cargando profile:", err);
      return null;
    } finally {
      isProfileLoading = false;
    }
  };

  const updateSessionState = async (newSession: Session | null) => {
    setSession(newSession);
    saveSessionToStorage(newSession);
    setIsLoggedIn(!!newSession);

    if (newSession?.user) {
      setUser(newSession.user);
      await loadProfile(newSession.user.id);
    } else {
      setUser(null);
      setProfile(null);
      saveProfileToStorage(null);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    let mounted = true;

    const initAuth = async () => {
      try {
        const cachedSession = getSessionFromStorage();
        if (cachedSession && mounted) {
          setSession(cachedSession);
          setUser(cachedSession.user);
          setIsLoggedIn(true);
        }

        const {
          data: { session: currentSession },
        } = await supabase.auth.getSession();

        if (mounted) {
          await updateSessionState(currentSession);

          if (
            currentSession?.user &&
            cachedSession?.user.id !== currentSession.user.id
          ) {
            await loadProfile(currentSession.user.id);
          }
        }
      } catch (error: any) {
        console.error("Error initializing auth:", error);
        setErrorM(error.message);
        console.log(errorM);

        saveProfileToStorage(null);
        saveSessionToStorage(null);
        await signOut();
      }
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "TOKEN_REFRESHED") return;
      updateSessionState(session);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = (email: string, password: string) =>
    supabase.auth.signUp({ email, password });

  const signIn = (email: string, password: string) =>
    supabase.auth.signInWithPassword({ email, password });

  const signInWithGoogle = () =>
    supabase.auth.signInWithOAuth({ provider: "google" });

  const signOut = async () => {
    const result = await supabase.auth.signOut();
    // Limpiar localStorage al hacer logout
    saveProfileToStorage(null);
    saveSessionToStorage(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("supabase.auth.token");
    }
    return result;
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setProfile(null);
      setSession(null);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error: any) {
      console.error("error signing out:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        session,
        isLoggedIn,
        signUp,
        signIn,
        signInWithGoogle,
        signOut,
        handleLogout,
        loadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
};
