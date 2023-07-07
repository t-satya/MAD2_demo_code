const Signup = Vue.component("signup", {
    template: `
      <div>
        <h1>Signup</h1>
        <form @submit.prevent="signup">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
    `,
    data() {
      return {
        email: "",
        password: "",
        username:"",
      };
    },
    methods: {
      signup() {
        fetch("http://localhost:3000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username:this.username,
            email: this.email,
            password: this.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            alert("Account created successfully");
            this.$router.push("/");
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  });
  
  export default Signup;