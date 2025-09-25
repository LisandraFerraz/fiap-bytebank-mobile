import { useAuth } from "@/contex/AuthContext";
import { db } from "@/firebase/config";
import {
  collection,
  DocumentReference,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { BankAccount } from "../interfaces/bank-account";

interface IBankAccInfo {
  ref: DocumentReference;
  data: BankAccount;
}

export const UseBank = () => {
  const { user } = useAuth();

  // returns bankAccInfo
  const getBankAccountData = async (): Promise<IBankAccInfo | null> => {
    try {
      const q = query(
        collection(db, "bank-accounts"),
        where("uid", "==", user?.uid)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty)
        console.error("getBankAccountData :: querySnapshot.empty ");

      const docSnap = querySnapshot.docs[0];
      const bankAccRef = docSnap.ref;
      const bankAccData = docSnap.data() as BankAccount;
      return { ref: bankAccRef, data: bankAccData };
    } catch (error) {
      console.error("getBankAccountData :: CATCH ERROR ", error);
      return null;
    }
  };

  return { getBankAccountData };
};
