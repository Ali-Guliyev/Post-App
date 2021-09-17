<template>
  <AnimationBackground
    v-if="
      $route.name != 'Home' &&
        $route.name != 'AllPosts' &&
        $route.name != 'PostDetails' &&
        $route.name != 'UserPosts'
    "
    amount="10"
    bgColor="white"
  />
  <!-- <AnimationBackground
    v-if="$route.name == 'AllPosts'"
    amount="30"
    bgColor="white"
  /> -->
  <div class="page-wrapper">
    <Navbar />
    <router-view />
  </div>
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import AnimationBackground from "@/components/AnimationBackground.vue";

export default {
  components: {
    Navbar,
    Footer,
    AnimationBackground,
  },
};
</script>
