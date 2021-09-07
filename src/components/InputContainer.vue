<template>
  <div class="inputContainer">
    <label>{{ title }}</label>
    <input
      v-model="value"
      @change="handleChange"
      :placeholder="placeholder"
      :required="isRequired ? false : true"
    />
  </div>
</template>

<script>
export default {
  props: ["title", "value", "placeholder", "isRequired"],
  setup(props) {
    const handleChange = () => {
      console.log(props.value);
    };

    return { handleChange };
  },
};
</script>
