<template>
  <div class="user">
    <div v-if="user">
      <img class="userImage" v-if="user.photoURL" :src="user.photoURL" />
      <img
        class="userImage"
        v-else
        src="@/assets/images/defaultUserImage.png"
      />
      <h1 class="userName">{{ user.displayName }}</h1>
      <p class="userBio">
        {{ user.bio }}
      </p>
      <div class="other">
        <div class="location" v-if="user.location">
          <img src="@/assets/images/location.svg" />
          <p>{{ user.location }}</p>
        </div>
        <div class="date">
          <img src="@/assets/images/calendar.svg" />
          <p>Joined {{ user.joinDate }}</p>
        </div>
      </div>
      <router-link :to="{ name: 'EditProfile' }" class="btn" v-if="ownership"
        >Edit Profile</router-link
      >
    </div>
    <div class="spinnerContainer" v-else>
      <Spinner size="90" color="" />
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import getUser from "@/composables/getUser";
import getDocument from "@/composables/getDocument";
import { computed, onMounted, watch } from "vue";
import { months } from "@/composables/getDate";
import Spinner from "@/components/Spinner.vue";
export default {
  components: { Spinner },
  setup() {
    const route = useRoute();
    const { user: currentUser } = getUser();
    const { document: user, error } = getDocument("users", route.params.id);

    const ownership = computed(
      () => currentUser.value && currentUser.value.uid == route.params.id
    );

    watch(user, () => {
      let joinDate = user.value.joinDate.toDate();
      user.value.joinDate = `${
        months[joinDate.getMonth()]
      } ${joinDate.getDay()}, ${joinDate.getFullYear()}`;
    });

    return { ownership, currentUser, error, user };
  },
};
</script>
