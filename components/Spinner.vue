<template>
    <div>
        <img src="@/assets/spinner1.png" class="spinnr">
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .spinnr { 
        width: 100%;
        animation: rotation 2.5s infinite linear;
    }

    @keyframes rotation {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(359deg);
    }
}
</style>