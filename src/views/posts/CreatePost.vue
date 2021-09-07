<template>
  <section class="form-section">
    <form class="form-wrapper" @submit.prevent="handleSubmit">
      <h1>Create Post</h1>

      <div class="inputContainer">
        <label>Message</label>
        <input v-model="message" placeholder="Enter message" required />
      </div>

      <div class="inputContainer" style="margin-bottom: 10px;">
        <label>Photo</label>
        <label for="file-input" class="fileButton">
          <p v-if="file">
            {{ filteredFileName(file.name, 11) }}
          </p>
          <p v-else>
            Select image
          </p>
          <img src="../../assets/images/addphoto2.svg" alt="" />
        </label>
      </div>

      <img v-if="file" class="postImage" :src="filePath" alt="" />

      <input
        id="file-input"
        type="file"
        hidden
        ref="hiddenInp"
        @change="handleChange(hiddenInp)"
      />

      <button class="btn" v-if="!isPending">
        Create
      </button>
      <div v-else>
        <Spinner size="60" color="" />
      </div>

      <p class="error" v-if="fileError">{{ fileError }}</p>
    </form>
  </section>
</template>

<script>
import getFile from "@/composables/getFile";
import useStorage from "@/composables/useStorage";
import Spinner from "@/components/Spinner";
import { ref } from "vue";
import useCollection from "@/composables/useCollection";
import getUser from "@/composables/getUser";
import { useRouter } from "vue-router";
import { timestamp } from "@/firebase/config";
export default {
  components: { Spinner },
  setup() {
    const {
      file,
      filePath,
      fileError,
      handleChange,
      filteredFileName,
    } = getFile();
    const message = ref(null);
    const hiddenInp = ref(null);
    const { user } = getUser();
    const { uploadImage, url } = useStorage();
    const { error, addDoc } = useCollection("posts");
    const router = useRouter();
    const isPending = ref(false);

    const handleSubmit = async () => {
      isPending.value = true;
      if (file.value) {
        await uploadImage(file.value, "postImages");
      }
      await addDoc({
        message: message.value,
        userId: user.value.uid,
        photoURL: url.value,
        createdAt: timestamp(),
      });
      if (!error.value) {
        router.push({ name: "AllPosts" });
        hiddenInp.value = null;
        file.value = null;
        message.value = null;
      }
      isPending.value = false;
    };

    return {
      file,
      filePath,
      fileError,
      handleChange,
      hiddenInp,
      handleSubmit,
      message,
      isPending,
      error,
      filteredFileName,
    };
  },
};
</script>
