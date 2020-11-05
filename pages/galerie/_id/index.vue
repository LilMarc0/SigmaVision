<template>
<div>
    <div class="page">
        <div class="container has-text-centered">
            <div class="notEditing" v-if="album && !loading">
                <h1 class="title">{{album.nume}}</h1>
                <article>{{album.descriere}}</article>
            </div>

            <div v-if="loading" class="spinner">
            <Spinner/>
            </div>
            <br><br><br>
            <Poze
                v-if="$auth.user && album && album.photos"
                :photos="album.photos"
                v-on:insertPhoto="insertPhoto($event)"
                v-on:viewPhoto="viewPhoto($event)"
                />
            <br><br><br>

            <stack :style="{opacity: opc}" @images-loaded="rfl" class="img-container"
                ref="stack"
                v-if="album && album.photos && !loading "
                :column-min-width="300" 
                :gutter-width="25" 
                :gutter-height="45">
                    <stack-item v-for="(photo, i) in album.photos" :key="i">
                        <img :src="'/' + photo.thumbNail" @click.prevent="viewPhoto(photo)">
                    </stack-item>
            </stack>

         </div>
    </div>
</div>

</template>

<script>
export default {
    layout: 'galerie',
    data() {
        return { 
            album: null,
            loading: true,
            opc: 0,
            isImageModalActive: false,
            imgSrc: null
        }
    },
    mounted(){
        const id = this.$route.fullPath.split('/')[2];
        this.$axios.get(`/albume/${id}`).then((res)=>{
            this.album = res.data;
            console.log(this.album.photos);
            this.loading = false;

        });

    },
    methods: {
        insertPhoto(photo){
            this.album.photos.push(photo);
            this.$refs.stack.reflow()
        },
        viewPhoto(photo){
            console.log(photo.thumbNail)
    
        },
        rfl() {
            console.log('--------------------');
            this.$refs.stack.reflow();
            this.opc=1;
        }
    },
    computed: {
        images() {
            return this.album.photos.filter(photo => '/'+photo.thumbNail)
        }
    }
}
</script>

<style scoped>

    .spinner { 
        justify-content: center;
        display: flex;
        flex-shrink: unset;
    }

.img-container {
    margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: center;
  overflow: hidden;
  margin: 0;
  object-fit: fill;
  cursor: pointer;
}
.img-container img {
  display: block;
  margin: 0;
  width: 100%;
  height: auto;
}
.img-container figcaption {
  margin: 3px 0;
  text-align: center;
}

</style>