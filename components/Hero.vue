<template>
  <section class="hero  is-medium">
    <TopNav/>
    <div class="hero-body is-primary">
      <div class="my-container">
        <h1 class="title">
          SigmaVision
        </h1>
        <h2 class="subtitle">
          See life through our lenses
        </h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
    .hero {
        background-image:
    linear-gradient(to bottom, rgba(243, 141, 8, 0.555),rgba(0, 0, 0, 0.877)),
    url('../assets/bannerDark.png');
        background-attachment: fixed;
        background-position: 15% -10%;
        background-repeat: no-repeat;
        background-size: auto;
        box-shadow: inset 0 -5px 15px 2px #202020;
        /* box-shadow: inset 0 -2px 1rem 0.25rem #202020; */
        width: 100%;
        height: 100vh;
        background-color: black;

    }

    .title{
      color: white;
    }

    .subtitle{
      color: white;
      padding-left: 1rem;
    }

    .my-container{
      margin-left: 10rem;
      padding-left: 10rem;
    }
</style>