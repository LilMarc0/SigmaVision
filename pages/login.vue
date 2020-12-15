<template>
  <div class="container">
      <b-field label="Email" class="field">
          <b-input v-model="user.email"></b-input>
      </b-field>
      <b-field label="Parola">
          <b-input type="password" v-model="user.password"></b-input>
      </b-field>
      <div class="center">
        <b-button @click="handleLogin">Login</b-button>
      </div>
  </div>
</template>

<script>
export default {
    layout: 'login',
    data() {
        return {
            user: {}
        }
    },
    methods: {
        handleLogin() {
            if (this.user.email && this.user.password) {
            this.$auth.loginWith('local', {data: this.user})
            .then((res) => {
                if(res.data.message === 'ok')
                    this.$router.push("/")
                })
            }
        }
    }
}
</script>

<style>
    .container {
        background-color: rgb(70, 39, 3);
        border-radius: 2rem;
        padding: 2rem 2rem 2rem 2rem
    }

    .label {
        color: white;
    }

    .center {
        justify-content: center;
        display:flex;
    }
</style>