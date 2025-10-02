import * as ImagePicker from "expo-image-picker";
import { UseSaveImg } from "../hooks/useSaveImg";

export async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri;
  }
  return null;
}

export const handleAttachImg = async (bodySetter: any, body: any) => {
  console.log("hello");
  const { uploadImage } = UseSaveImg();
  const imgUrl = await pickImage();

  if (imgUrl) {
    const url = await uploadImage(imgUrl);
    bodySetter({ ...body, file: url });
  }
};
