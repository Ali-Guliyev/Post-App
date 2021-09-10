<template>
  <div v-if="formattedPosts != null">
    <div class="posts" v-for="post in formattedPosts" :key="post.id">
      <div class="post">
        <div class="row">
          <div class="col-1">
            <router-link
              :to="{ name: 'UserProfile', params: { id: post.userId } }"
            >
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
            </router-link>
          </div>
          <div class="col-2">
            <router-link
              :to="{ name: 'UserProfile', params: { id: post.userId } }"
            >
              <p class="userName" v-if="ownership(post.userId)">You</p>
              <p class="userName" v-else>{{ post.userName }}</p>
            </router-link>
            <p class="postDate">{{ post.createdAt }} ago</p>
          </div>
          <div class="col-3" v-if="ownership(post.userId)">
            <Dropdown :id="post.id" @handleDelete="handleDelete(post)" />
          </div>
        </div>
        <div class="content">
          <p class="message">{{ post.message }}</p>
          <img v-if="post.photoURL" class="postImage" :src="post.photoURL" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Spinner size="50" color="" />
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { months } from "@/composables/getDate";
import getCollection from "@/composables/getCollection";
import Spinner from "@/components/Spinner.vue";
import Dropdown from "@/components/Dropdown.vue";
import { formatDistanceToNow } from "date-fns";
export default {
  props: ["posts"],
  components: { Spinner, Dropdown },
  setup(props) {
    const { user: currentUser } = getUser();
    const { documents: users } = getCollection("users");

    const ownership = (id) => currentUser.value && currentUser.value.uid == id;

    const getUserById = (id) => {
      let res;
      if (users.value) {
        users.value.forEach((user) => {
          if (user.id == id) {
            res = user;
          }
        });
      }
      return res;
    };

    const handleDelete = async (post) => {
      const { deleteDoc } = useDocument("posts", post.id);
      const { deleteImage } = useStorage();
      await deleteDoc();
      await deleteImage(post.filePath);
    };

    const formattedPosts = computed(() => {
      if (props.posts && users.value) {
        return props.posts.map((post, index) => {
          const user = getUserById(post.userId);
          const date = post.createdAt.toDate();
          let datePosted = `${months[date.getMonth()]} ${date.getDate()}`;
          let time = formatDistanceToNow(date);
          return {
            ...props.posts[index],
            userName: user.displayName,
            userImage: user.photoURL,
            createdAt: time,
            datePosted,
          };
        });
      }
    });

    return { getUserById, ownership, formattedPosts, handleDelete };
  },
};
</script>

<style>
.post {
  position: relative;
  margin: 25px auto;
  max-width: 580px;
  border-radius: 30px;
  padding: 40px;
  padding-bottom: 10px;
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
  margin: 20px 0 13px 0;
}

.postImage {
  width: 100%;
  border-radius: 20px;
  max-height: 300px;
  object-fit: contain;
  margin-bottom: 25px;
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

@media screen and (max-width: 1000px) {
  .posts {
    max-width: 400px;
    margin: 0 auto;
  }

  .post {
    padding: 25px;
  }

  .userImage {
    width: 60px;
    height: 60px;
  }

  .userName {
    font-size: 17px;
  }

  .postDate {
    font-size: 12px;
  }

  .postImage {
    margin-bottom: 8px;
    margin-top: 10px;
  }

  .col-1 {
    margin-right: 13px;
  }

  .spinner {
    margin: 20px auto;
  }

  .message {
    font-size: 14px;
    margin: 10px 0 0px 0;
  }

  .dropdown .dropdown-content .dropdownEl {
    font-size: 13.5px;
    padding: 17px 70px;
  }

  .dropdown .dropdown-content {
    left: -150px;
  }
}
</style>
