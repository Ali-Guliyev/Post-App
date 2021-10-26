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
    <img
      @click="handleSubmit"
      class="searchLogo"
      src="../assets/images/search.png"
      alt=""
    />
  </form>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { onlyContainsSpaces } from "@/composables/utilityFunctions";
export default {
  setup() {
    const router = useRouter();
    const search = ref("");

    const handleSubmit = () => {
      if (onlyContainsSpaces(search.value)) {
        router.push({ name: "AllPosts" });
      } else {
        router.push({
          name: "MatchingPosts",
          params: { search: search.value },
        });
      }
    };

    return { handleSubmit, search };
  },
};
</script>

<style scoped>
.searchLogo {
  width: 20px;
  transform: translate(-40px, 2px);
  cursor: pointer;
  transition: all 0.3s ease;
}

.searchLogo:hover {
  transform: scale(1.1) translate(-36px, 2px);
}

@media screen and (max-width: 1000px) {
  .searchLogo {
    width: 13px;
    transform: translateX(-20px, 2px);
  }
}
</style>
