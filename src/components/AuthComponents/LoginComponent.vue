<template>
  <div class="login">
    <div>
      <form @submit.prevent="submit">
        <div>
          <label for="email">Email Address:</label>
          <input type="text" name="email" v-model="email" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" name="password" v-model="password" />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p v-if="showError" id="error">email or Password is incorrect</p>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { ref } from "vue";
export default {
  name: "LoginComponent",
  components: {},
  setup() {
    const store = useStore();
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const showError = ref(false);

    const submit = () => {
      const User = new FormData();
      User.append("email", email.value);
      User.append("password", password.value);
      store
        .dispatch("auth/LogIn", User)
        .then((response) => {
          console.log('RESPONSE>>>>>>>>>>>', response.data);
          router.push("/posts");
          showError.value = false;
        })
        .catch((error) => {
          console.log(error);
          showError.value = true;
        });
    };

    return {
      email,
      password,
      showError,
      submit,
    };
  },
  //   data() {
  //     return {
  //       form: {
  //         email: "",
  //         password: "",
  //       },
  //       showError: false
  //     };
  //   },
  //   methods: {
  //     ...mapActions(["LogIn"]),
  //     async submit() {
  //       const User = new FormData();
  //       User.append("email", this.form.email);
  //       User.append("password", this.form.password);
  //       try {
  //         await this.LogIn(User);
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

  