import { ref } from "vue";
import { projectFirestore } from "@/firebase/config";
import lengthLimits from "./getLengthLimits";

const useCollection = (collection) => {
  const error = ref(null);
  const isPending = ref(false);

  const addDoc = async (doc, id) => {
    error.value = null;
    isPending.value = true;

    try {
      if (
        collection == "posts" &&
        doc.message.length > lengthLimits.post.message
      ) {
        throw Error(
          `Message should have less than ${lengthLimits.post.message} characters`
        );
      }

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
