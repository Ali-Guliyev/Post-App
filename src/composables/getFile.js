import { ref, computed } from "vue";

const fileError = ref(null);
const filePath = ref(null);
const file = ref(null);

// allowed types
const types = ["image/png", "image/jpeg"];

const handleChange = (hiddenInp) => {
  const selected = hiddenInp.files[0];
  if (selected && types.includes(selected.type)) {
    fileError.value = null;
    const reader = new FileReader();
    file.value = selected;
    reader.onload = () => {
      filePath.value = reader.result;
    };
    reader.readAsDataURL(selected);
  } else if (!selected) {
    fileError.value = "Please choose an image";
  } else {
    fileError.value = "Please select an image file (png or jpg)";
  }
};

const filteredFileName = (string, limit) => {
  if (string.length >= limit) {
    return string.substring(0, limit) + "...";
  }
  return string;
};

const getFile = () => {
  return { fileError, filePath, file, handleChange, filteredFileName };
};

export default getFile;
