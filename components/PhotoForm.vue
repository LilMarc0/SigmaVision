<template>
  <div>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
            <p class="modal-card-title">Capitol nou</p>
            <button
                type="button"
                class="delete"
                @click="$emit('close')"/>
        </header>
        <section class="modal-card-body">
            <b-field label="Drag n drop photos">
                <b-upload
                    v-model="model.fotografii"
                    expanded
                    multiple
                    drag-drop>
                    <span class="file-cta">
                        <b-icon class="file-icon" icon="upload"></b-icon>
                        <span class="file-label">Incarca o fotografie</span>
                    </span>
                </b-upload>
            </b-field>
        <div class="tags">
            <span v-for="(file, index) in model.fotografii"
                :key="index"
                class="tag is-primary" >
                {{file.name}}
                <button class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)">
                </button>
            </span>
        </div>
        </section>
        <footer class="modal-card-foot">
            <button class="button" type="button" @click="$emit('close')">Inchide</button>
            <button class="button is-primary" @click="handleInput">Adauga</button>
        </footer>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            model: {
                fotografii: null
            }
        }
    },
    methods: {
        async handleInput() {
            const album = this.$route.fullPath.split('/')[2];
            console.log(this.model.fotografii);
            this.model.fotografii.forEach((photo) => {
                let fd = new FormData();
                fd.append('img', photo);

                this.$axios.post(`/album_has_photos/${album}`, fd,{
                    headers: {
                        'Content-Type': 'multipart/form-data'
                        }
                    }).then((res) => {
                        this.$emit("insert", res.data);
                        this.$buefy.snackbar.open({
                            duration: 5000,
                            message: `Fotografia ${res.data.nume} a fost adaugata.`,
                            position: 'is-bottom-left',
                        })
                    });

            })            

            },
            deleteDropFile(index) {
                    this.dropFiles.splice(index, 1)
                }
    }
}
</script>

<style>
    .modal-card {
        width: auto;
    }
</style>