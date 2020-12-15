<template>
 <div>


    <div class="content">
      <h1 class="title">Cine suntem noi?</h1>
      <article v-if="cine" class="left">
        {{cine}}
      </article>
    </div>


     <div class="galerie">
       <h1 class="titleglr"> Hall of fame </h1>
       <div class="container">
        <Carousel/>
       </div>
    </div>


    <div class="jr">
      <h1 class="title">Ce servicii oferim?</h1>
    </div>
    <div class="content2">
      <article v-if="servicii" class="left">
        {{servicii}}
      </article>
    </div>

    <div class="contact">
      <h1 class="title">Vrei sa colaboram? Trimite-ne un mesaj!</h1>
      <div class="split">
        <div class="hf1">
          <article>
            Raspundem repede tututor solicitarilor si ne facem treaba cu pasiune si placere.
          </article>
          <h2 class="title">Adresa: </h2> 
          <p>Strada Mihai Eminescu, nr 22, Orsova</p><br>
          <h2 class="title">Numar de telefon: </h2>
          <p></p>
          <h2 class="title">Email: </h2>
          <p>plm nu mai stiu</p>
        </div>
        <div class="hf2">
            <Formular/>
        </div>
      </div>
    </div>

    <div class="maps">
      <GmapMap
          :center="{lat:44.716101, lng:22.396057}"
    :zoom="18"
    map-type-id="terrain"
    style="width: 100%; height: 500px">
      <GmapMarker :position="{lat:44.716101, lng:22.396057}"/>
    </GmapMap>
    </div>


 </div>

</template>

<script>
import { log } from 'util'

const qs = require('querystring')

export default {
  data(){
    return {
        album: null,
        cine: null,
        servicii: null,
    }
  },
  mounted(){
    this.$axios.get("/misc/cine.txt").then((res)=>{
      this.cine = res.data;
    })
    this.$axios.get("/misc/servicii.txt").then((res)=>{
      this.servicii = res.data;
    })
  },
  methods: {

  }
}
</script>

<style scoped>
  .content {
    padding-left: 8rem;
    margin-top: 6rem;
    padding-bottom: 2rem;
    padding-right: 3rem;
    display: flex;
    flex-direction: column;

  }
  .left {
    padding-left: 6rem;
      font-family: Garamond, serif;
      grid-column: 1/8;
      text-align: justify;
        width: 100%;
  }

  .content2 {
    padding-left: 8rem;
    margin-top: 2rem;
    margin-bottom: 4rem;
        padding-right: 3rem;

    display: flex;
    flex-direction: column;
  }

  .right {
        padding-left: 6rem;
      font-family: Garamond, serif;
      grid-column: 2/10;
        text-align: justify;
          width: 100%;
  }
  .jr {
    text-align: right;
    padding-right: 8rem;
    margin-top: 6rem;
  }

  .container {
    margin-top: 2rem;
  }



  article, h1 {
    color: rgb(236, 221, 208);
  }

  .galerie {
            background-image:
    linear-gradient(to bottom, rgba(243, 141, 8, 0.555),rgba(0, 0, 0, 0.877)),
    url('../assets/blurred_logo.png');
        background-attachment: fixed;
        background-position: 15% -10%;
        background-repeat: no-repeat;
        background-size: auto;
        box-shadow: inset 0 -5px 15px 2px #202020;
        /* box-shadow: inset 0 -2px 1rem 0.25rem #202020; */
        background-color: black;
        padding-top: 3rem;
        padding-bottom: 3rem;

        box-shadow: inset 0 5px 15px 2px #202020;

  }

  .titleglr {
    text-align: center;
    font-size: 3rem;
  }

  .contact {
    text-align: center;
    padding-bottom: 4rem;
  }

  .split {
    display: grid;
    grid-template-columns: 50% 50%;
    color: white
  }
  .maps {
    width: 100%
  }

@media only screen and (max-width: 1000px){
  .left {
    padding-left: 1rem;
    font-family: Garamond, serif;
    text-align: justify;
    width: 100%;
  }

  .right {
      padding-left: 0;
      font-family: Garamond, serif;
      text-align: justify;
      width: 100%;
  }

  .content {
    padding-left: 1rem;
  }

  .content2 {
    padding-right: 1rem;
    padding-left: 1rem;
}
}

</style>

