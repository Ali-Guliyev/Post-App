<template>
  <section>
    <h1 class="title">My Posts</h1>
    <center>
      <router-link :to="{ name: 'CreatePost' }">
        <button class="btn">
          <p>Create post</p>
          <img src="@/assets/images/addphoto.svg" alt="" />
        </button>
      </router-link>
    </center>
    <ListView :posts="posts" v-if="posts" />
    <p class="noposts" v-else>You have not created any posts yet</p>
  </section>
</template>

<script>
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import ListView from "@/components/ListView";
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
section {
  width: 100%;
}

.btn {
  margin: 14px;
  margin-bottom: 0;
}

.btn p {
  margin-right: 10px;
  display: inline;
}

.btn img {
  width: 16px;
}

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

  .btn img {
    width: 12px;
  }
}
</style>
