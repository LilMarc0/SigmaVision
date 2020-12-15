<template>
  <div class="formular">
      <b-field label="Nume" label-position="inside">
        <b-input v-model="model.nume"></b-input>
      </b-field>
    <b-field label="Email" label-position="inside">
        <b-input validation-message="Introduce o adresa de e-mail valida" type="email" v-model="model.email"></b-input>
      </b-field>
    <b-field label="Telefon" label-position="inside">
        <b-input validation-message="Introduce un numar de telefon valid" type="tel" v-model="model.telefon"></b-input>
    </b-field>
    <b-field label="Mesaj" label-position="inside">
        <b-input minlength="5" type="textarea" v-model="model.mesaj"></b-input>
    </b-field>
    <div class="container">
      <b-button icon-left="email" @click="trimite" >Trimite</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      model: {}
    }
  },
  methods: {
    trimite(){
      this.$axios.post('/message', this.model).then(()=>{
                            this.$buefy.snackbar.open({
                        duration: 5000,
                        message: `Mesajul a fost trimis.`,
                        position: 'is-bottom-left',
                    })
      });
    }
  }
}
</script>

<style>
    .formular{
        width: 70%;
    }

    @media only screen and (max-width: 1000px){
      .formular {
        width: 90%;
      }
    }
</style>