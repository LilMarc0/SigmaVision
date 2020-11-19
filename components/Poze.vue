<template>
    <div>
    <h1 class="title">Fotografii:</h1>
    <b-field grouped group-multiline>
    <button class="button field is-danger" @click="adaugaFoto">
            <b-icon icon="plus"></b-icon>
            <span>Adauga Fotografii</span>
    </button>
     <button class="button field is-danger" @click="stergeSelectii">
            <b-icon icon="plus"></b-icon>
            <span>Sterge selectiile</span>
    </button>
    <b-checkbox v-model="editing">Click editeaza fotografie (testare)</b-checkbox>
</b-field>

    <section v-if="fotografii">
        <b-table 
        :data="fotografii" 
        :columns="columns"
        :checked-rows.sync="selectii"
        checkable
        selectable
        checkbox-position="left"
        @select="clickPhoto"
        >
            <!-- <template slot="actions" slot-scope="row">
                <b-button @click="clickChapter(row)"> Edit </b-button>
                <b-button @click="deleteChapter(row)"> Delete </b-button>
            </template> -->
        </b-table>
    </section>
    </div>
</template>

<script>

import PhotoForm from "@/components/PhotoForm"
// import CapitolEditForm from "@/components/CapitolEditForm"

export default {
    data() {
        return {
            columns: [
                {
                    field: 'nume',
                    label: 'Nume',
                },
                {
                    field: 'createdAt',
                    label: 'Data crearii',
                    centered: true
                },
                {
                    field: 'updatedAt',
                    label: 'Data update',
                    centered: true
                }
            ],
            fotografii: null,
            selectii: [],
            editing: false,
        }
    },
    props: {
        photos: {
            type: Array
        }
    },
    mounted(){
        this.fotografii = this.photos;
    },
    methods: {
        adaugaFoto() {
            this.$buefy.modal.open({
                parent: this,
                component: PhotoForm,
                hasModalCard: true,
                customClass: 'custom-class custom-class-2',
                trapFocus: true,
                width: 720,
                events: {
                    'insert': insertedPhoto => {
                        console.log("modal catre chapters: ", insertedPhoto);
                        this.$emit('insertPhoto', insertedPhoto);
                    }
                }
            })
        },
        clickPhoto(photo){
            this.$emit('viewPhoto', photo)
        },
        stergeSelectii(){
            console.log(this.selectii);
            this.selectii.forEach((selectie, index) => {
                console.log(this.selectii);
                this.$axios.delete(`/photo/${selectie.id}`).then((res)=>{
                    this.$buefy.snackbar.open({
                        duration: 5000,
                        message: `Fotografia ${res.data.nume} a fost stearsa.`,
                        position: 'is-bottom-left',
                    })
                })
            })
        }
    }
}
</script>

<style>

</style>