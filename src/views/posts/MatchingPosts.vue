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
