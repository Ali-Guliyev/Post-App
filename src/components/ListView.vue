<template>
  <div v-if="posts">
    <div class="posts" v-for="post in posts" :key="post.id">
      <div class="post">
        <div class="row">
          <div class="col-1">
            <img
              v-if="post.userImage"
              :src="post.userImage"
              alt=""
              class="userImage"
            />
            <img
              v-else
              src="@/assets/images/defaultUserImage.png"
              alt=""
              class="userImage"
            />
          </div>
          <div class="col-2">
            <p class="userName" v-if="ownership(post.userId)">You</p>
            <p class="userName" v-else>{{ post.userName }}</p>
            <p class="postDate">less than a minute ago</p>
          </div>
          <div class="col-3">
            <img src="@/assets/images/options.svg" alt="" />
          </div>
        </div>
        <div class="content">
          <p class="message">{{ post.message }}</p>
          <img v-if="post.photoURL" class="postImage" :src="post.photoURL" />
        </div>
      </div>
    </div>
  </div>
  <div v-else><Spinner size="70" color="" /></div>
</template>

<script>
import { computed } from "@vue/reactivity";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import { watch } from "@vue/runtime-core";
import Spinner from "@/components/Spinner";
export default {
  props: ["posts"],
  components: { Spinner },
  setup(props) {
    const { user: currentUser } = getUser();
    const { documents: users } = getCollection("users");

    const ownership = (id) => currentUser.value && currentUser.value.uid == id;

    const getUserById = (id) => {
      let res;
      users.value.forEach((user) => {
        if (user.id == id) {
          res = user;
        }
      });
      return res;
    };

    watch(users, () => {
      props.posts.forEach((post, index) => {
        const user = getUserById(post.userId);
        props.posts[index] = {
          ...props.posts[index],
          userName: user.displayName,
          userImage: user.photoURL,
        };
      });
    });

    return { getUserById, ownership };
  },
};
</script>

<style scoped>
.post {
  position: relative;
  margin: 45px auto;
  max-width: 580px;
  border-radius: 30px;
  box-shadow: 0 4px 11px #61c8bb;
  padding: 40px 40px;
}

.userImage {
  border-radius: 50%;
  width: 70px;
  height: 70px;
  object-fit: cover;
}

.userName {
  font-size: 20px;
  font-family: "roboto-medium";
  margin-bottom: 2px;
}

.postDate {
  font-size: 15px;
  color: #adadad;
}

.message {
  font-size: 17px;
}

.postImage {
  width: 100%;
  border-radius: 20px;
  max-height: 300px;
  object-fit: cover;
}

.row {
  display: flex;
  align-items: center;
}

.col-1 {
  margin-right: 17px;
  display: flex;
  align-items: center;
}

.col-2 {
  flex: 1;
}

.spinner {
  margin: 25px auto;
}
</style>
