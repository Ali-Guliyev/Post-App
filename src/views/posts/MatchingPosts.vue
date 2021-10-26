<template>
  <ListView :posts="formattedPosts" />
</template>

<script>
import ListView from "@/components/ListView.vue";
import getCollection from "@/composables/getCollection";
import { computed, ref, watch } from "vue";
export default {
  components: { ListView },
  props: ["search"],
  setup(props) {
    const { documents: posts } = getCollection("posts", "createdAt");
    const { documents: userDocs } = getCollection("users", "joinDate");

    const users = ref();

    watch(userDocs, () => {
      users.value = userDocs.value;
    });

    const formattedPosts = computed(() => {
      /* 
      
      TODO✅: When Input contains nothing or contains only spaces and submitting it, switch to the AllPosts route
      TODO✅: Make back button
      TODO✅: Make button in AllPosts and MyPosts at the bottom right corner so that user can scroll up instantly (Make a top trigger div element)
      TODO: Searching users

      */
      let newPosts = posts.value.filter((post, index) => {
        if (post.message.includes(props.search)) {
          return true;
        }
      });

      return newPosts;
    });

    return { formattedPosts };
  },
};
</script>
