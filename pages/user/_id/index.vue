<template>
    <table v-if="userData!=null" class="table container center">
        <tbody>
            <tr>
            <th scope="row">Nume</th>
            <td>{{userData.nume}}</td>
            </tr>

            <tr>
            <th scope="row">Email</th>
            <td>{{userData.email}}</td>
            </tr>

            <tr>
            <th scope="row">Username</th>
            <td>{{userData.username}}</td>
            </tr>

            <tr>
            <th scope="row">Rol</th>
            <td>{{userData.rol}}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    data() {
        return {
            userData: null
        }
    },
    mounted() {
        const urlSplit = this.$route.fullPath.split('/');
        const username = urlSplit[urlSplit.indexOf('user') + 1];
        this.$axios.get(`/user/${username}`).then((res) => {
            this.userData = res.data;
            console.log(this.userData);
        });
    }
}
</script>