<template>
  <ListView :posts="docs" />
</template>

<script>
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView.vue";
export default {
  components: { ListView },
  setup() {
    const { documents: docs } = getCollection("posts", "createdAt");

    return { docs };
  },
};
</script>
