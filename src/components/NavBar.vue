<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/posts">Posts</router-link> |
    <span v-if="isLoggedIn">
      <a @click="logout">Logout</a>
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link> |
      <router-link to="/login">Login</router-link>
    </span>
  </div>
</template>
  <script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter  } from "vue-router";
export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLoggedIn = computed(() => store.getters['auth/isAuthenticated']);

    const logout = async () => {
      await store.dispatch('auth/LogOut');
      router.push("/login");
    };

    return {
      isLoggedIn,
      logout,
    };
  },
  // computed : {
  //     isLoggedIn : function(){ return }
  //   },
  //   methods: {
  //     async logout() {
  //       await this.$store.dispatch("LogOut");
  //       this.$router.push("/login");
  //     },
  //   },
};
</script>
  <style>
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
a:hover {
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
  