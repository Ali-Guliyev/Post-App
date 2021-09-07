import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc, id) => {
    error.value = null;
    isPending.value = true;

    try {
      let res = "";
      if (id) {
        res = await projectFirestore
          .collection(collection)
          .doc(id)
          .set(doc);
      } else {
        res = await projectFirestore.collection(collection).add(doc);
      }
      isPending.value = false;
      return res;
    } catch (err) {
      error.value = err.message;
      isPending.value = false;
    }
  };

  return { error, addDoc, isPending };
};

export default useCollection;
