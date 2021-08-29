<template>
  <div class="nav-container">
    <nav>
      <router-link :to="{ name: 'Home' }" class="logo">
        <img src="@/assets/images/logo.svg" alt="" />
        <p>Post App</p>
      </router-link>
      <div v-if="user" class="auth-container">
        <ul class="nav-links">
          <router-link :to="{ name: 'AllPosts' }"
            ><li class="nav-link"><p>All Posts</p></li></router-link
          >
          <router-link :to="{ name: 'Home' }">
            <li class="nav-link"><p>My Posts</p></li></router-link
          >
          <router-link :to="{ name: 'UserProfile', params: { id: user.uid } }">
            <li class="nav-link profile">
              <p>{{ user.displayName }}</p>
              <img v-if="user.photoURL" :src="user.photoURL" alt="" />
              <img v-else src="@/assets/images/defaultUserImage.png" alt="" />
            </li>
          </router-link>
        </ul>
        <button class="btn btn-danger" @click="handleClick">
          Logout
        </button>
      </div>
      <div v-else>
        <router-link :to="{ name: 'Auth' }">
          <button class="btn">
            Register
          </button>
        </router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from "@/composables/getUser";
import useLogout from "@/composables/useLogout";
import getDocument from "@/composables/getDocument";
import { useRouter } from "vue-router";
import { onMounted, watch } from "@vue/runtime-core";
export default {
  setup() {
    const { user } = getUser();
    const { logout, error } = useLogout();
    const router = useRouter();

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    return { user, handleClick };
  },
};
</script>
