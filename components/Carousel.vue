<template>
    <div class="carousel">
            <b-carousel
        :autoplay="true"
        :indicator="false"
        :overlay="gallery"
        :repeat="true"
        :pause-info="false"
        @click.prevent="switchGallery(true)">
        <b-carousel-item v-for="(item, i) in items" :key="i">
            <figure class="image">
                <img :src="item.image" class="img">
            </figure>
        </b-carousel-item>
        <span v-if="gallery" @click.prevent.stop="switchGallery(false)" class="modal-close is-large"/>
        <template slot="overlay">
            <div class="has-text-centered has-text-white">
                Hall of fame
            </div>
        </template>
    </b-carousel>
    </div>

</template>

<script>
export default {
    data() {
        return {
            gallery: false,
            al: {
                hasGrayscale: true,
                itemsToShow: 4,
                breakpoints: {
                    768: {
                        hasGrayscale: false,
                        itemsToShow: 4
                    },
                    960: {
                        hasGrayscale: true,
                        itemsToShow: 6
                    }
                }
            },
            items: []
        }
    },
    methods: {
        switchGallery(value) {
            this.gallery = value
            if (value) {
                document.documentElement.classList.add('is-clipped')
            } else {
                document.documentElement.classList.remove('is-clipped')
            }
        }
    },
    mounted(){
        this.$axios.get('/albume/hall/hall').then((res)=>{
            let poze = res.data;
            console.log(res.data);
            for(let i=0; i<poze.length; i++){
                this.items.push({title: poze[i].nume, image: poze[i].thumbNail})
            }
        })
    }
}
</script>

<style scoped>
    .img {
        height: 50vh;
    }

    @media only screen and (max-width: 1000px){
        .carousel {
            width: 100%;
        }
    }
</style>