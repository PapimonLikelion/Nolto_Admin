<template>
  <Navbar />
  <h4 class="mt-3">{{ $store.state.backendUrl }} 의 기술 스택</h4>
  <div class="searchbar input-group mt-3 mb-5">
    <input
      @input="search"
      type="text"
      class="form-control"
      placeholder="기술스택 명으로 검색"
    />
  </div>
  <div class="techCards">
    <TechCard
      v-for="techData in allTechData"
      :key="techData"
      :techData="techData"
      @techDeleted="deleteTech($event)"
    />
  </div>
</template>

<script>
import Navbar from "../Navbar.vue";
import TechCard from "./TechCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import store from "../../store.js";

export default {
  name: "techboard",
  components: {
    Navbar,
    TechCard,
  },
  setup() {
    let allTechData = ref([]);
    let allTechDataOriginal = ref([]);

    function search(e) {
      let searchWord = e.target.value;
      let result = allTechDataOriginal.value.filter((techData) => {
        return (
          techData.text.toUpperCase().includes(searchWord.toUpperCase())
        );
      });
      this.allTechData = [...result];
    }

    function deleteTech(id) {
      let updatedAllTechData = allTechData.value.filter((TechData) => {
        return TechData.id != id;
      });
      this.allTechData = [...updatedAllTechData];

      let updatedAllTechDataOriginal = allTechDataOriginal.value.filter((TechData) => {
          return TechData.id != id;
        }
      );
      this.allTechDataOriginal = [...updatedAllTechDataOriginal];
    }

    function getTechs() {
      axios
        .get(store.state.backendUrl + "/admin/techs", {
          headers: {
            Authorization: "Bearer " + store.state.adminToken,
          },
        })
        .then((result) => {
          allTechData.value = result.data;
          allTechDataOriginal.value = [...result.data];
        })
        .catch((result) => {
          alert(result);
        });
    }

    onMounted(() => {
      getTechs();
    });

    return { allTechData, search, deleteTech, getTechs };
  },
}
</script>

<style>
.techCards {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>