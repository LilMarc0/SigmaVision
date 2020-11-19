<template>
<div>
    <div class="page">
        <div class="container has-text-centered">
            <b-button v-if="$auth.user" @click="sterge">Sterge albumul</b-button>
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
        </div>
          
          <div class="container2">
            <stack :style="{opacity: opc}" @images-loaded="rfl" class="img-container"
                ref="stack"
                v-if="album && album.photos && !loading "
                :column-min-width="500" 
                :gutter-width="5" 
                :gutter-height="45">
                    <stack-item v-for="(photo, i) in album.photos" :key="i">
                        <img :src="'/' + photo.thumbNail" @click.prevent="viewPhoto(photo)">
                    </stack-item>
            </stack>
          </div>

            <div id="myModal" class="modal" :style="{display: displayModal}">
                <span class="close" @click="displayModal='none'">&times;</span>
                <img :src="'/'+currentImage" class="modal-content" id="img01">
                <div id="caption">{{currentCaption}}</div>
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
            imgSrc: null,
            displayModal: "none",
            currentImage: null,
            currentCaption: ''
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
            this.displayModal='block';
            this.currentImage=photo.thumbNail;
            this.currentCaption=photo.nume;
        },
        rfl() {
            console.log('--------------------');
            this.$refs.stack.reflow();
            this.opc=1;
        },
        sterge(){
          this.$axios.delete(`/albume/${this.album.id}`).then(()=>{
            this.$router.push('/galerie');
          })
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


/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

/* Modal Content (image) */
.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
}

/* Caption of Modal Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation */
.modal-content, #caption {  
  animation-name: zoom;
  animation-duration: 0.6s;
}

@keyframes zoom {
  from {transform: scale(0.1)} 
  to {transform: scale(1)}
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

.container2{
  width: 90vw;
  justify-content: center;
  display: flex;
  margin: 0 auto;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content {
    width: 100%;
  }
}

.page {
  color: white;
}

</style>