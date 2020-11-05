<template>
    <b-navbar class="navbar is-primary is-spaced">
        <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    class="logo"
                    src="../assets/surface746.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>
        <template slot="start">
            <b-navbar-item href="/">
                Acasa
            </b-navbar-item>
            <b-navbar-item href="/galerie">
                Galerie
            </b-navbar-item>
            <b-navbar-item v-if="isLoggedIn && isAdmin" href="/admin">
                AdminZone
            </b-navbar-item>
        </template>
        <template slot="end">
            <h1 v-if="isLoggedIn">Bine ai venit, {{userName}}</h1>
            <b-button v-if="isLoggedIn" @click="logout">Logout</b-button>
        </template>
        
    </b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
        }
    },
    props: {

    },
    computed: {
        userName: function() {try {return this.$auth.user.username} catch{return "eroare userName"}},
        isAdmin: function() {try {return this.$auth.user.role == 'admin'} catch {return false}},
        isLoggedIn: function() {try { return this.$auth.loggedIn } catch{ return false}},
        credit: function() { return this.$store.getters.brainPoints}
    },
    methods: {
        logout() {
            this.$auth.logout()
            this.$router.push('/')
      },
    },
    mounted(){
        console.log(this.$auth.user);
    }
}
</script>

<style lang="scss">
$primary:  rgb(255, 187, 0);
$light:  rgb(255, 187, 0);
    .info {
        margin-right: 1rem;
    }

</style>