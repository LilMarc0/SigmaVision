<template>
  <div class="container">
      <div v-if="messages && messages.length > 0">
        <template v-for="(msg, idx) of messages">
            <div class="card" :key="idx">
                <header class="card-header">
                    <p class="card-header-title">
                    {{Date(msg.createdAt)}}
                    </p>
                </header>
                <div class="card-content">
                    <div class="content">
                    <h1>Nume: </h1>
                    <p>{{msg.nume}}</p>
                    <h1>Telefon: </h1>
                    <p>{{msg.telefon}}</p>
                    <h1>Email: </h1>
                    <p>{{msg.email}}</p>
                    <h1>Mesaj: </h1>
                    <p>{{msg.mesaj}}</p>
                    <br>
                    </div>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="sterge(idx)">Sterge</a>
                </footer>
            </div>
        </template>
      </div>
    <div v-else>
        <h1> NU EXISTA MESAJE </h1>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            messages: null,
        }
    },
    mounted(){
        this.$axios.get('/message').then(res =>{
            this.messages = res.data;
            console.log(this.messages);
        })
    },
    methods: {
        sterge(idx){
            this.$axios.delete(`/message/${this.messages[idx].id}`).then(()=>{
                this.messages.splice(idx, 1);
            })
        }
    }
}
</script>

<style scoped>
    .card {
        margin-top: 2rem;
        margin-bottom: 2rem;
        
    }
    .p {
        margin-left: 2rem;
    }
</style>