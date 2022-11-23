import { ref } from 'vue'
import axios from 'axios'

const getPost = (post_id) => {
    const post = ref({});
    const err = ref(null);

    const loadDaddyJokes = async () => {
      try {
          let data = await axios.get('https://dummyjson.com/posts');
          let allPosts = data.data.posts;
          allPosts.map(value => {
             if(parseInt(post_id) ===  value.id) {
                post.value = value;
             }
          });
      } catch (error) {
        console.log('Error ', error);
        err.value = 'Something went wrong, please retry again later'
      }
    }
  
    return { post, err, loadDaddyJokes }
}

export default getPost;