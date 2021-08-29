<template>
  <h1>Edit Profile</h1>

  <FileInputButton
    @fileChange="(file = $event.file), (fileError = $event.fileError)"
  />
  <br /><br />

  <button class="btn" @click="handleSubmit" v-if="!isPending">
    Change image
  </button>
  <Spinner v-else size="50" color="" />

  <div class="error" v-if="fileError">
    {{ fileError }}
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import useStorage from "@/composables/useStorage";
import useUser from "@/composables/useUser";
import getUser from "@/composables/getUser";
import Spinner from "@/components/Spinner.vue";
import FileInputButton from "@/components/FileInputButton.vue";
export default {
  components: { FileInputButton, Spinner },
  setup() {
    const { uploadImage } = useStorage();
    const { user } = getUser();
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    onMounted(() => {
      console.log(user.value);
    });

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;
        await uploadImage(
          file.value,
          "profilePictures",
          "users",
          user.value.uid
        );
        isPending.value = false;
      }
    };

    return { handleSubmit, file, fileError, isPending };
  },
};
</script>
