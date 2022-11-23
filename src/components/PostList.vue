<template>
  <div class="post-list">
    <h3>COME ON >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.</h3>
    <div v-for="post in posts" :key="post.id">
      <!-- <h3>{{ post.title }}</h3> -->
      <SinglePost :post="post" />
    </div>
  </div>
</template>

<script>
import { onMounted, onUnmounted, onUpdated } from "vue";
import SinglePost from "./SinglePost.vue";
export default {
  name: "PostList",
  props: {
    posts: Array,
  },

  components: {
    SinglePost,
  },

  setup(props) {
    console.log("These are the props", props.posts);
    onMounted(() => {
      console.log("component has been mounted");
    });
    onUnmounted(() => {
      console.log("component has been unmounted");
    });

    onUpdated(() => {
      console.log("component has been updated");
    });
  },
};
</script>

<style>
</style>