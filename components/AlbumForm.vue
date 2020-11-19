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
            <b-field label="Nume">
                <b-input
                    :value="model.nume"
                    v-model="model.nume"
                    placeholder="Numele capitolului"
                    required>
                </b-input>
            </b-field>

            <b-field label="Descriere">
                <b-input
                    type="textarea"
                    :value="model.descriere"
                    v-model="model.descriere"
                    placeholder="descriere"
                    required>
                </b-input>
            </b-field>

            <b-field label="Fotografie de coperta">
                <b-upload
                    v-model="model.fotografie"
                    expanded
                    drag-drop>
                    <span class="file-cta">
                        <b-icon class="file-icon" icon="upload"></b-icon>
                        <span class="file-label">Incarca o fotografie</span>
                    </span>
                </b-upload>
            </b-field>
            <div class="tags">
                <span v-if="model.fotografie" class="tag is-primary">
                    {{model.fotografie.name ? model.fotografie.name : "Nicio fotografie incarcata"}}
                    <button class="delete is-small" type="button" @click="deleteDropFile()"></button>
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
                fotografie: null
            }
        }
    },
    methods: {
        async handleInput() {
            let fd = new FormData();
            fd.append('img', this.model.fotografie);
            fd.append('model', JSON.stringify(this.model));
            this.$axios.post('/albume', fd,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                    }
                }).then((res)=>{
                    this.$emit("insert", res.data);
                    this.$buefy.snackbar.open({
                        duration: 5000,
                        message: `Albumul a fost adaugat.`,
                        position: 'is-bottom-left',
                    })
                    this.$emit('close');
                });
        },
        deleteDropFile() {
            this.model.fotografie = null;
        }
    }
}
</script>

<style>

</style>