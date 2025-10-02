import { useAuth } from "@/contex/AuthContext";
import { storage } from "@/firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const UseSaveImg = () => {
  const { user } = useAuth();

  const uriToBlob = async (uri: string): Promise<Blob> => {
    const response = await fetch(uri);
    return await response.blob();
  };

  const uploadImage = async (uri: string) => {
    try {
      const blob = await uriToBlob(uri);

      const storageRef = ref(storage, `users/${user?.uid}/${Date.now()}.jpg`);

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("uploadImage :: ERROR CAUGHT ", error);
      throw error;
    }
  };

  return { uploadImage };
};
