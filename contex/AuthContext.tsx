import { auth } from "@/firebase/config";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContextType {
  user: UserCredential | null;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserCredential | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential);
      console.log(userCredential);
      setIsAuthenticated(true);
      router.replace("/");
      console.log("AuthProvider :: [LOGIN] - login com sucesso ");

      return true;
    } catch (error) {
      console.log("AuthProvider :: [LOGIN] - falha no login ", error);
      return false;
    }
  };

  const signUp = (email: string, password: string) => {
    // setUsers([...users, { email, password }]);
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/login");
        console.log(
          "AuthProvider :: SignUp - usuário cadastrado ",
          email,
          password
        );
      })
      .catch((error) => {
        console.log("AuthProvider :: SignUp - falha no cadastro ", error);
      });
  };

  const logout = () => {
    auth.signOut();
    console.log("AuthProvider :: Usuário deslogado");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signUp,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error(
      "Contexto não encontrado. UseAuth deve estar dentro de AuthProvider."
    );

  return context;
};
