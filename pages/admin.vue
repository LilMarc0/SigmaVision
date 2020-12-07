<template>
  <div class="container">
      <b-field label="Cine suntem noi?" v-if="textMain">
        <b-input v-model="textMain.cine" :value="textMain.cine" type="textarea"></b-input>
      </b-field>

      <b-field class="field" label="Ce servicii oferim?" v-if="textMain">
        <b-input v-model="textMain.servicii" :value="textMain.servicii" type="textarea"></b-input>
      </b-field>
      <b-button @click="updateMain">Update</b-button>

      <div v-if="$auth.user.role == 'admin'">
        <h1>
          Creeaza moderator
        </h1>
      <b-field class="field" label="Nume" v-if="textMain">
        <b-input v-model="user.nume" :value="user.nume" type="text"></b-input>
      </b-field>
      <b-field class="field" label="Prenume" v-if="textMain">
        <b-input v-model="user.prenume" :value="user.prenume" type="text"></b-input>
      </b-field>
      <b-field class="field" label="Username" v-if="textMain">
        <b-input v-model="user.username" :value="user.username" type="text"></b-input>
      </b-field>
      <b-field class="field" label="Email" v-if="textMain">
        <b-input v-model="user.email" :value="user.email" type="text"></b-input>
      </b-field>
      <b-field class="field" label="Parola" v-if="textMain">
        <b-input v-model="user.password" :value="user.password" type="text"></b-input>
      </b-field>
      <b-button @click="creeazaUser">Creeaza</b-button>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      textMain: null,
      user: {linkPhoto: 'empty.png'}
    }
  },
  mounted(){
    this.$axios.get('/misc').then((res) => {
      this.textMain = res.data
    })
  },
  methods: {
    async updateMain(){
      this.$axios.put('/misc', this.textMain).then(()=>{
        // this.$axios.get('/misc').then((res) => {
        //   this.textMain = res.data
        // })
      });
    },
    creeazaUser(){ 
      this.$axios.post('/register', this.user).then(()=>{
        this.$router.push('/');
      })
    }

  }
}
</script>

<style>
  .container {
    padding-bottom: 3rem;
    padding-top: 3rem;

  }

  .field{
    color: white;
  }
</style>