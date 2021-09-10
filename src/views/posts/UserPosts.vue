<template>
  <h1 class="title">My Posts</h1>
  <ListView :posts="posts" v-if="posts" />
  <p class="noposts" v-else>You have not created any posts yet</p>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView";
import { onMounted, watch } from "@vue/runtime-core";
export default {
  components: { ListView },
  setup() {
    const { user } = getUser();
    const { documents: posts } = getCollection("posts", "createdAt", [
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

.noposts {
  text-align: center;
  font-size: 17px;
  margin-top: 5px;
}

@media screen and (max-width: 1000px) {
  .title {
    font-size: 19px;
  }
}
</style>
