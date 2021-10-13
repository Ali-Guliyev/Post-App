<template>
  <div class="posts">
    <SearchInput v-if="$route.name != 'UserPosts'" />
    <div class="postsWrapper" v-if="formattedPosts != null">
      <div class="post" v-for="(post, index) in formattedPosts" :key="post.id">
        <div class="row">
          <div class="col-1">
            <router-link
              :to="{ name: 'UserProfile', params: { id: post.userId } }"
            >
              <img
                v-if="getUserById(post.userId).photoURL"
                :src="getUserById(post.userId).photoURL"
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
              <p class="userName" v-else>
                {{ getUserById(post.userId).displayName }}
              </p>
            </router-link>
            <p class="postDate">{{ post.createdAt }} ago</p>
          </div>
          <div class="col-3">
            <div v-if="ownership(post.userId)">
              <Dropdown :id="post.id" @handleDelete="handleDelete(post)" />
            </div>
            <div v-else>
              <router-link
                :to="{ name: 'PostDetails', params: { id: post.id } }"
                class="moreBtn"
                >More</router-link
              >
            </div>
          </div>
        </div>
        <div class="content">
          <textarea class="message" readonly :value="post.message"></textarea>
          <img v-if="post.photoURL" class="postImage" :src="post.photoURL" />
        </div>

        <div class="action">
          <div class="like" @click="handleLike(post, index)">
            <img
              v-if="post.isLiked"
              class="static"
              src="@/assets/images/liked.svg"
            />
            <img v-else class="static" src="@/assets/images/like.svg" />
            <img class="hover" src="@/assets/images/likeHover.svg" />
            <span :style="{ color: post.isLiked ? '#0DE6CB' : '#515151' }">{{
              post.likes.length
            }}</span>
          </div>
          <router-link :to="{ name: 'PostDetails', params: { id: post.id } }">
            <div class="comment">
              <img class="static" src="@/assets/images/comment.svg" />
              <img class="hover" src="@/assets/images/commentHover.svg" />
              <span>{{ post.comments.length }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <Spinner size="50" color="" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import getUser from "@/composables/getUser";
import useDocument from "@/composables/useDocument";
import useStorage from "@/composables/useStorage";
import { months } from "@/composables/getDate";
import getCollection from "@/composables/getCollection";
import Spinner from "@/components/Spinner.vue";
import Dropdown from "@/components/Dropdown.vue";
import SearchInput from "@/components/SearchInput.vue";
import { formatDistanceToNow } from "date-fns";
import { onMounted, onUpdated } from "@vue/runtime-core";
export default {
  props: ["posts"],
  components: { Spinner, Dropdown, SearchInput },
  setup(props) {
    const { user: currentUser } = getUser();
    const { documents: users } = getCollection("users");
    const ownership = (id) => currentUser.value && currentUser.value.uid == id;

    onUpdated(() => {
      const messageInputs = document.querySelectorAll(".message");
      messageInputs.forEach((messageInput) => {
        messageInput.style.height = messageInput.scrollHeight + "px";
      });
    });

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

    const handleLike = async (post, index) => {
      const { updateDoc } = useDocument("posts", post.id);

      if (!post.isLiked) {
        await updateDoc({
          likes: [...post.likes, { userId: currentUser.value.uid }],
        });
      } else {
        let likes = post.likes.filter(
          (like) => like.userId != currentUser.value.uid
        );
        await updateDoc({
          likes,
        });
      }
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
          const date = post.createdAt.toDate();
          let time = formatDistanceToNow(date);

          let isLiked = false;
          if (post.likes.length) {
            post.likes.forEach((like) => {
              if (like.userId == currentUser.value.uid) {
                isLiked = true;
              }
            });
          }

          return {
            ...props.posts[index],
            createdAt: time,
            isLiked,
          };
        });
      }
    });

    return {
      getUserById,
      ownership,
      formattedPosts,
      handleDelete,
      handleLike,
    };
  },
};
</script>

<style>
textarea.message,
textarea.commentMessage {
  resize: none;
  border: none;
  margin-bottom: -10px;
}

textarea.message:focus,
textarea.commentMessage:focus {
  outline: none;
}

.posts {
  max-width: 580px;
  margin: 0 auto;
  padding: 0 25px;
}

.post {
  position: relative;
  margin: 25px 0;
  border-radius: 30px;
  padding: 30px;
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
  width: 100%;
}

.postImage {
  width: 100%;
  border-radius: 20px;
  max-height: 300px;
  object-fit: contain;
}

.action {
  display: flex;
  justify-content: space-between;
  padding: 10px 50px;
}

.action img.hover {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.action img,
.action span {
  transition: all 0.15s ease;
}

.action div:hover img.hover {
  opacity: 1;
}

.action div {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.action span {
  font-size: 19px;
  margin-left: 5px;
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

.col-3 {
  flex: 1;
  position: relative;
}

.col-3 .moreBtn {
  font-size: 18px;
  color: #0de6cb;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0;
}

.spinner {
  margin: 25px auto;
}

.searchInput {
  border-radius: 12px;
  font-size: 18px;
  padding: 10px 15px;
  margin-top: 20px;
  margin-bottom: -5px;
  border: 0;
  box-shadow: 0 2px 5px #61c8bb;
  color: gray;
  transition: all 0.16s ease;
  width: 100%;
}

.searchInput::placeholder {
  color: gray;
}

.searchInput:focus {
  outline: 0;
}

.searchInputContainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media screen and (max-width: 1000px) {
  .action {
    padding-top: 7px;
    padding-bottom: 5px;
  }

  .action img {
    width: 22px;
  }

  .action span {
    font-size: 15px;
  }

  .posts {
    max-width: 500px;
    margin: 0 auto;
  }

  .post {
    padding: 25px;
    padding-bottom: 12px;
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

  .col-3 .moreBtn {
    font-size: 14px;
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

  .dropdown img {
    width: 20px;
  }

  .dropdown .dropdown-content {
    left: -150px;
  }

  .searchInput {
    font-size: 15px;
    border: 1px solid #61c8bb;
  }
}
</style>
