<template>
  <div>
  <div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="album.coperta" alt="Placeholder image" @click="moveTo">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img :src="album.coperta" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4">{{ album.creator }}</p>
        <p class="subtitle is-6"> {{ album.link }}</p>
      </div>
    </div>

    <div class="content">
      {{album.descriere}}
      <br>
      <time datetime="2016-1-1">{{album.createdAt}}</time>
    </div>
  </div>
</div>
  </div>
</template>

<script>
export default {
  
    props: {
        album: Object
    },
    methods: {
      moveTo() {
        console.log('click');
        this.$router.push(`/galerie/${this.album.id}`);
      }
    }
}
</script>

<style scoped lang="scss">
 .card {
 }

</style>