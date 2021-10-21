<template>
    <div>
        <div>
            <TechButton v-for="tech in currentTechs" :key="tech" :tech="tech" @techDeleted=deleteTech($event) />
        </div>
        <span class="input-group-text">Techs</span>
        <div class="mb-2">
            <input @input="searchTech" v-model="searchWord" type="text" class="form-control" placeholder="기술스택 검색">
            <ul class="list-group searchedTechs">
                <li class="list-group-item list-group-item-info techResult" v-for="techResult in searchTechResults" :key="techResult" @click="appendToCurrentTech(techResult)">
                    {{techResult.text}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import TechButton from './TechButton.vue';

export default {
    name: "tech",
    props: {
        techs: Array,
    },
    components: {
        TechButton,
    },
    data() {
        return {
            currentTechs: [...this.techs],
            searchWord: "",
            searchTechResults: undefined,
        }
    },
    methods: {
        deleteTech(id) {
            let changedCurrentTechs = this.currentTechs.filter((tech) => {
                return tech.id != id;
            })
            this.currentTechs = [...changedCurrentTechs];
        },
        searchTech() {
            if (this.searchWord == "") {
                this.searchTechResults = undefined;
                return;
            }

            axios.get(this.$store.state.backendUrl + '/tags/techs?auto_complete=' + this.searchWord)
            .then((result) => {
                this.searchTechResults = result.data;
            }) 
            .catch((error) => {
                alert(error.response.data.message);
            })
        },
        appendToCurrentTech(tech) {
            if (this.currentTechs.includes(tech)) {
                return;
            }
            this.currentTechs.push(tech);
            this.searchTechResults = undefined;
            this.searchWord = "";
            this.$emit("techChanged", this.currentTechs);
        }
    }
}
</script>

<style>
.searchedTechs {
    position: absolute;
    background-color: rgb(255, 255, 255);
    overflow-y: scroll;
    width: 70%;
    z-index: 5;
}

.techResult:hover{
    background-color: aquamarine;
}
</style>