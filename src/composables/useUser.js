import { ref } from "vue";

const error = ref(null);
const isPending = ref(false);

const useUser = () => {
  return { error, isPending };
};

export default useUser;
