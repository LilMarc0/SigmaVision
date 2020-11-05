<template>
  <div>
    <div class="center">
    <b-button v-if="$auth.user" @click="cAlbum">Creeaza album</b-button>
      </div>
    <div v-if="!loading" class="toate">
    <Album v-for="(album, key) of albume"
        :key="key"
        :album="album"/>
    </div>

    <div v-if="loading" class="spinner">
      <Spinner/>
    </div>
  </div>
</template>

<script>
import AlbumForm from '@/components/AlbumForm';
export default {
    layout: "galerie",
    data() {
        return {
            albume: null,
            loading: true,
                  images: [
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/nature-quotes-1557340276.jpg?crop=0.666xw:1.00xh;0.168xw,0&resize=640:*',
      ],
      index: null
        }
    },
    methods: {
        cAlbum() {
            console.log('da');
            console.log(AlbumForm);
            this.$buefy.modal.open({
                    parent: this,
                    component: AlbumForm,
                    hasModalCard: true,
                    customClass: 'custom-class custom-class-2',
                    trapFocus: true
                })
        }
    },
    mounted() {
        this.$axios.get('/albume').then((res)=>{
            this.albume = res.data;
            setTimeout(function(){this.loading = false}.bind(this), 100);
        })
    }
}
</script>

<style>
    .toate{
        justify-content: center;
        text-justify: center;
        display: grid;
        grid-template-columns: 1fr 1fr; /*repeat(auto-fill, minmax(20rem, 1fr)); */
        grid-gap: 1rem;
        max-width: 80vw;
        margin: 5rem auto;
    }

    .spinner { 
        justify-content: center;
        display: flex;
        flex-shrink: unset;
    }

    .center {
        margin-top: 1rem;
        display: flex;
        justify-content: center;
    }

</style>