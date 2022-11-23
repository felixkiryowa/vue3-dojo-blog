<template>
    <div>
       <div v-if="post" class="post">
          <h3>{{ post.title }}</h3>
          <p class="pre">{{ post.body }}</p>
       </div>
    </div>
</template>

<script>
import getPost from '../composables/getPost'
export default {
  name:"DetailsComponent",
  props:{
    id:String
  },

  setup(props) {

    console.log(props.id);

    const { post , err, loadDaddyJokes }  = getPost(props.id);
    loadDaddyJokes();


    return { post, err }

  }
}
</script>

<style>

</style>