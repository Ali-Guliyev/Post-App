<template>
  <input type="file" ref="hiddenInput" hidden="hidden" @change="handleChange" />
  <button
    @click="hiddenInput.click()"
    class="inputFileButton"
    ref="inputFileButton"
  >
    <span v-if="file">{{ file.name }}</span>
    <span v-else>Select image</span>
    <img src="@/assets/images/uploadphoto.svg" alt="" />
  </button>
</template>

<script>
import { ref } from "vue";
export default {
  setup(props, context) {
    const hiddenInput = ref(null);
    const inputFileButton = ref(null);
    const file = ref(null);
    const fileError = ref(null);

    // allowed types
    const types = ["image/png", "image/jpeg"];

    const handleChange = () => {
      const selected = hiddenInput.value.files[0];
      if (selected && types.includes(selected.type)) {
        fileError.value = null;
        file.value = selected;
      } else if (!selected) {
        fileError.value = "Please choose an image";
      } else {
        fileError.value = "Please select an image file (png or jpg)";
      }
      context.emit("fileChange", {
        file: file.value,
        fileError: fileError.value,
      });
    };

    return {
      handleChange,
      hiddenInput,
      inputFileButton,
      file,
      fileError,
    };
  },
};
</script>

<style></style>
