import { ref } from 'vue'
import axios from 'axios'

const getPosts = () => {
    const posts = ref([]);
    const err = ref(null);

    const loadDaddyJokes = async () => {
      try {
          let data = await axios.get('https://dummyjson.com/posts');
          console.log('data', data.data.posts);
          posts.value = data.data.posts;
      } catch (error) {
        console.log('Error ', error);
        err.value = 'Something went wrong, please retry again later'
      }
    }
  
    return { posts, err, loadDaddyJokes}
}


export default getPosts;