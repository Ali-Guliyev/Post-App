import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Auth from "../views/Auth.vue";
import AllPosts from "../views/posts/AllPosts.vue";
import UserProfile from "../views/users/UserProfile.vue";
import EditProfile from "../views/users/EditProfile.vue";
import CreatePost from "../views/posts/CreatePost.vue";
import NotFound from "../views/NotFound.vue";

import { projectAuth } from "@/firebase/config";

const requireAuth = (from, to, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next();
  } else {
    next({ name: "Home" });
  }
};

const noRequireAuth = (from, to, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    beforeEnter: noRequireAuth,
  },
  {
    path: "/allposts",
    name: "AllPosts",
    component: AllPosts,
    beforeEnter: requireAuth,
  },
  {
    path: "/profile/:id",
    name: "UserProfile",
    component: UserProfile,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/createpost",
    name: "CreatePost",
    component: CreatePost,
    beforeEnter: requireAuth,
  },
  // 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
