<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <h1>Sign up</h1>
    <div class="inputContainer">
      <label>Display name</label>
      <input v-model="displayName" placeholder="Enter display name" required />
    </div>
    <div class="inputContainer">
      <label>Email</label>
      <input v-model="email" type="email" placeholder="Enter email" required />
    </div>
    <div class="inputContainer">
      <label>Password</label>
      <input
        v-model="password"
        type="password"
        placeholder="Enter password"
        required
      />
    </div>

    <button class="btn" v-if="!isPending">
      Signup
    </button>
    <Spinner v-else size="50" color="#0DE6CB" />

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
  </form>
</template>

<script>
import Spinner from "@/components/Spinner.vue";
import useSignup from "@/composables/useSignup";
import useCollection from "@/composables/useCollection";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { months } from "@/composables/getDate";
export default {
  components: { Spinner },
  setup() {
    const { error, signup, isPending } = useSignup();
    const { addDoc } = useCollection("users");
    const email = ref("");
    const password = ref("");
    const displayName = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      let date = new Date();
      let joinDate = `${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;
      let location = null;
      let creds;
      // if (window.innerWidth > 1000) {
      //   await fetch("http://ip-api.com/json")
      //     .then((res) => res.json())
      //     .then((data) => {
      //       location = `${data.city}, ${data.country}`;
      //     });
      // }
      await signup(email.value, password.value, displayName.value).then(
        (cred) => {
          creds = cred;
        }
      );

      await addDoc(
        {
          displayName: creds.user.displayName,
          email: creds.user.email,
          photoURL: creds.user.photoURL,
          bio: "Hi there! I am using Post App.",
          location,
          joinDate,
          likedPosts: [],
        },
        creds.user.uid
      );

      if (!error.value) {
        router.push({ name: "UserPosts" });
      }
    };

    return {
      handleSubmit,
      email,
      password,
      displayName,
      error,
      isPending,
    };
  },
};
</script>
