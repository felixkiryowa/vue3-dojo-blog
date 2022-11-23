<template>
  <div class="hello">
     <p ref="p">My name is {{ name }} , and am {{ age }} years old</p>
     <button @click="handleButtonClick">Click Me</button>
     <br>
     <br>
     <input type="text" v-model="name">
     <br>
     <p>My name is {{ ninjaTwo.name }} , and am {{ ninjaTwo.age }} years old</p>
     <br>
     <button @click="handleReactiveRef">Update Age</button>
     <br>
     <input type="text" v-model="search"/>
     <br>
     <p>Search Term {{ search }}</p>
     <br>
     <div v-for="name in matchingNames" :key="name">
        {{ name }}
    </div>
    <br>
    <PostList :posts="posts"/>

  </div>
</template>

<script>
import { ref, reactive, computed, watch, watchEffect } from 'vue';
import getPosts from '../composables/getPosts';
import PostList from './PostList.vue'
export default {
  name: 'HelloWorld',
  components:{
     PostList
  },
  setup() {
    console.log('This is set up');

    const p = ref(null);

    const handleButtonClick = () => {
      // console.log(p, p.value);
      name.value = 'Joyce';
      age.value = 26
    }

    const name = ref('Kiryowa Francis')
    const age = ref(25)
    const ninjaTwo = reactive({name:'mario', age:23})

    const handleReactiveRef = () => {
       ninjaTwo.age = 60;
    }

    const search = ref('');

    watch(search, ()=> {
       console.log('Watch function running', search);
    })

    watchEffect(() => {
      console.log('Watch Effect Run');
    })

    const names = ref(['josh', 'jerry', 'joseph', 'jim'])

    const matchingNames = computed(() => {
      return names.value.filter((name) => name.includes(search.value))
    });

    // const posts = ref([
    //   {title: 'welcome to the blog', body:'Creating a Single-page Application with Vue + Vue Router feels natural: with Vue.js, we are already composing our application with components. When adding Vue Router to the mix, all we need to do is map our components to the routes and let Vue Router know where to render them. Here a basic example:', id:1 },
    //   {title: 'top 5 CSS tips', body: 'lorem ipsum', id: 2 }
    // ]);

    const {posts, err, loadDaddyJokes } = getPosts();
    console.log(err);

    loadDaddyJokes();





    return {
      name:name,
      age:age,
      handleButtonClick,
      p,
      ninjaTwo,
      handleReactiveRef,
      names,
      search,
      matchingNames,
      posts
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
