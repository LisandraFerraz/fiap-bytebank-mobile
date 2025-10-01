import { auth, db } from "@/firebase/config";
import { BankAccount } from "@/utils/interfaces/bank-account";
import { UserData } from "@/utils/interfaces/user";
import { router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { createContext, ReactNode, useContext, useState } from "react";

interface IAuthContextType {
  user: UserData | null;
  login: (email: string, password: string) => void;
  signUp: (signUpBody: UserData, bankAccBody: BankAccount) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(async () => {
        const q = query(collection(db, "users"), where("email", "==", email));

        const querySnapshot = await getDocs(q);
        let userData = null;

        querySnapshot.forEach((doc) => {
          userData = { ...doc.data() };
          setUser(userData as UserData);
        });

        console.log("AuthProvider :: [LOGIN] - login com sucesso ", user);
        setIsAuthenticated(true);
        router.replace("/");
      });
    } catch (error) {
      console.log("AuthProvider :: [LOGIN] - falha no login ", error);
    }
  };

  const signUp = (signUpBody: UserData, bankAccBody: BankAccount) => {
    createUserWithEmailAndPassword(auth, signUpBody.email, signUpBody.password)
      .then(async (response: any) => {
        console.log("AuthProvider :: SignUp - básico", response.user.uid);
        try {
          await addDoc(collection(db, "users"), {
            ...signUpBody,
            uid: response.user.uid,
          }).then(async () => {
            await addDoc(collection(db, "bank-accounts"), {
              ...bankAccBody,
              usuarioCpf: signUpBody.cpf,
              uid: response.user.uid,
            }).then((res) => {
              router.replace("/login");
              console.log("AuthProvider :: SignUp - usuário cadastrado: ", res);
            });
          });
        } catch (error) {
          console.error("Erro ao criar usuário na Firebase. ", error);
        }
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
