<template>
  <form @submit.prevent="handleSubmit" class="searchInputContainer">
    <input
      @input="
        (e) => {
          search = e.target.value;
        }
      "
      class="searchInput"
      type="text"
      placeholder="Search..."
    />
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const search = ref("");

    const handleSubmit = () => {
      router.push({ name: "MatchingPosts", params: { search: search.value } });
    };

    return { handleSubmit, search };
  },
};
</script>
