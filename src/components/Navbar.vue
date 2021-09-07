<template>
  <div class="nav-container">
    <nav>
      <router-link :to="{ name: 'Home' }" class="logo">
        <img src="@/assets/images/logo.svg" alt="" />
        <p>Post App</p>
      </router-link>
      <div v-if="user">
        <div class="links-container" ref="linksContainer">
          <img
            class="expandBtn"
            @click="toggleMenu"
            src="@/assets/images/expand.svg"
          />

          <ul class="nav-links">
            <router-link @click="toggleMenu" :to="{ name: 'AllPosts' }"
              ><li class="nav-link"><p>All Posts</p></li></router-link
            >
            <router-link @click="toggleMenu" :to="{ name: 'Home' }">
              <li class="nav-link"><p>My Posts</p></li></router-link
            >
            <router-link @click="toggleMenu" :to="{ name: 'CreatePost' }">
              <li class="nav-link"><p>Create Post</p></li>
            </router-link>
            <router-link
              @click="toggleMenu"
              :to="{ name: 'UserProfile', params: { id: user.uid } }"
            >
              <li class="nav-link profile">
                <p>{{ user.displayName }}</p>
                <img v-if="user.photoURL" :src="user.photoURL" alt="" />
                <img v-else src="@/assets/images/defaultUserImage.png" alt="" />
              </li>
            </router-link>

            <button class="btn btn-danger" @click="handleClick">
              Logout
            </button>
          </ul>
        </div>

        <div class="burgerMenu" @click="toggleMenu">
          <div class="line-1"></div>
          <div class="line-2"></div>
          <div class="line-3"></div>
        </div>
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
import { onMounted, ref, watch } from "@vue/runtime-core";
export default {
  setup() {
    const { user } = getUser();
    const { logout, error } = useLogout();
    const router = useRouter();
    const linksContainer = ref(null);

    const handleClick = async () => {
      await logout();
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    const toggleMenu = () => {
      linksContainer.value.classList.toggle("active");
    };

    return { user, handleClick, toggleMenu, linksContainer };
  },
};
</script>
