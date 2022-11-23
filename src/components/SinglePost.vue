<template>
  <div class="post">
    <router-link :to="{name:'DetailsComponent', params: { id: post.id }}">
    <h3>{{ post.title }}</h3>
    </router-link>
    <p>{{ snippet }}</p>
    <span v-for="tag in post.tags" :key="tag">
        #{{ tag }}
    </span>
  </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: "SinglePost",
  props: {
    post: Object,
  },

  setup(props) {
     const snippet = computed(() => {
        return props.post.body.substring(0, 20) + '...'
     });

     return { snippet }
  }
};
</script>

<style>
</style>