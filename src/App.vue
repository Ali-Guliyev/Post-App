<template>
  <AnimationBackground
    v-if="
      $route.name == 'Auth' ||
        $route.name == 'CreatePost' ||
        $route.name == 'EditPost' ||
        $route.name == 'UserProfile' ||
        $route.name == 'EditProfile'
    "
    amount="10"
    bgColor="white"
  />
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
