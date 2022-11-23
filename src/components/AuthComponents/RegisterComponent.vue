<template>
  <div class="register">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="username">Username:</label>
          <input type="text" name="username" v-model="form.username" />
        </div>
        <div>
          <label for="full_name">Full Name:</label>
          <input type="text" name="full_name" v-model="form.full_name" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="form.password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    <p v-if="showError" id="error">Username already exists</p>
  </div>
</template>



<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "RegisterComponent",
  components: {},
  setup() {
    const store = useStore();
    const form = ref({ username: "", full_name: "", password: "" });
    const showError = ref(false);

    const submit = async () => {
      try {
        await store.dispatch("auth", "Register", form);
        this.$router.push("/posts");
        showError.value = false;
      } catch (error) {
        showError.value = true;
      }
    };

    return { form, showError, submit };
  },

  //   data() {
  //     return {
  //       form: {
  //         username: "",
  //         full_name: "",
  //         password: "",
  //       },
  //       showError: false,
  //     };
  //   },
  //   methods: {
  //     ...mapActions(["Register"]),
  //     async submit() {
  //       try {
  //         await this.Register(this.form);
  //         this.$router.push("/posts");
  //         this.showError = false;
  //       } catch (error) {
  //         this.showError = true;
  //       }
  //     },
  //   },
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}
button[type="submit"] {
  background-color: #4caf50;
  color: white;
  padding: 12px 20px;
  cursor: pointer;
  border-radius: 30px;
}
button[type="submit"]:hover {
  background-color: #45a049;
}
input {
  margin: 5px;
  box-shadow: 0 0 15px 4px rgba(0, 0, 0, 0.06);
  padding: 10px;
  border-radius: 30px;
}
#error {
  color: red;
}
</style>

