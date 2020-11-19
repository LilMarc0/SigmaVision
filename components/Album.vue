<template>
  <div>
  <div class="card">
  <div class="card-image">
    <div class="image is-4by3 container">
      <img :src="album.coperta" alt="Placeholder image" class="image" @click="moveTo">
        <div class="middle" @click="moveTo">
          <div class="text">Vezi albumul</div>
        </div>
    </div>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img v-if="album.sigmausers[0]" :src="album.sigmausers[0].linkPhoto" alt="Placeholder image">
        </figure>
      </div>
      <div class="media-content">
        <p class="title is-4" v-if="album.sigmausers[0]">{{album.sigmausers[0].username}}</p>
        <p class="subtitle is-6"> {{ album.nume }}</p>
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
        this.$router.push(`/galerie/${this.album.id}`);
      }
    }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
}

.image {
  opacity: 1;
  display: block;
  transition: .3s ease;
  backface-visibility: hidden;
}

.middle {
  transition: .3s ease;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%)
}

.container:hover .image {
  filter: blur(3px)
}

.container:hover .middle {
  opacity: 1;
}

.text {
  background-color: #c75e18;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
}

.card {}
</style>