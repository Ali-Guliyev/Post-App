<template>
  <h1 class="title">My Posts</h1>
  <ListView :posts="posts" />
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView";
export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: posts } = getCollection("posts", null, [
      "userId",
      "==",
      user.value.uid,
    ]);

    return { posts };
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  margin-top: 20px;
  font-size: 25px;
}

@media screen and (max-width: 1000px) {
  .title {
    font-size: 19px;
  }
}
</style>
