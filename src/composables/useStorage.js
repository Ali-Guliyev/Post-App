import { ref } from "vue";
import { projectStorage } from "../firebase/config";
import useDocument from "./useDocument";
import getUser from "./getUser";
import { projectAuth } from "@/firebase/config";

const { user } = getUser();

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  const uploadImage = async (file, urlName, collection, docId) => {
    filePath.value = `${urlName}{/${user.value.uid}/${file.name}`;
    const storageRef = projectStorage.ref(filePath.value);

    try {
      const res = await storageRef.put(file);
      url.value = await res.ref.getDownloadURL();
      if (collection) {
        const { updateDoc } = useDocument(collection, docId);
        await updateDoc({ photoURL: url.value });
        if (collection == "users") {
          await projectAuth.currentUser.updateProfile({ photoURL: url.value });
        }
      }
    } catch (err) {
      error.value = err.message;
    }
  };

  const deleteImage = async (path) => {
    const storageRef = projectStorage.ref(path);

    try {
      await storageRef.delete();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { url, filePath, error, uploadImage, deleteImage };
};

export default useStorage;
