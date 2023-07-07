const Login = Vue.component("login", {
    data() {
        return {
          email: "",
          password: "",
          errorMessage:"",
          role:"customer"
        };
      },
    template: `
      <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <button><router-link to="/signup">SignUP</router-link></button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>

    `,
    methods: {
      check_role(){
        if(this.email==="admin@mail.com"){
          this.role="admin"
        }
      },
      login() {
        this.check_role();
        console.log(this.role)
        fetch("http://localhost:3000/login?include_auth_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
              const token=data.response.user.authentication_token;
              localStorage.setItem("token", token);
              if(this.role==="customer"){
              this.$router.push("/profile")
              }else{
                this.$router.push("/adminprof")
              }
            })
          .catch((error) => {
            this.errorMessage = "Invalid Credentials";
            console.error(error);
          });
        /*do a role check here in the frontend based on emails
        or do another fetch call after getting the token and get the role 
        from the backend */
      },
    },
  });
  
  export default Login;