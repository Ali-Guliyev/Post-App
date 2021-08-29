<template>
  <div
    class="spinner"
    :style="{
      height: size + 'px',
      width: size + 'px',
      borderTopColor: color == '' ? '#0DE6CB' : color,
    }"
  ></div>
</template>

<script>
export default {
  props: ["size", "color"],
};
</script>

<style scoped>
.spinner {
  border: 5px solid transparent;
  border-radius: 50%;
  animation: spin 1s ease infinite;
  margin-top: 30px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
