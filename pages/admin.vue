<template>
  <div class="container">
      <b-field label="Cine suntem noi?" v-if="textMain">
        <b-input v-model="textMain.cine" :value="textMain.cine" type="textarea"></b-input>
      </b-field>

      <b-field class="field" label="Ce servicii oferim?" v-if="textMain">
        <b-input v-model="textMain.servicii" :value="textMain.servicii" type="textarea"></b-input>
      </b-field>
      <b-button @click="updateMain">Update</b-button>
  </div>
</template>

<script>
export default {
  data(){
    return {
      textMain: null,
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