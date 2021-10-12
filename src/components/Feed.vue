<template>
    <Navbar/>
    <div v-if="showAll">
        <div class="searchbar input-group mt-5 mb-5">
            <input @input="search" type="text" class="form-control" placeholder="키워드로 검색" aria-label="키워드로 검색" aria-describedby="basic-addon2">
        </div>
        <div class="feedCards">
            <FeedCard v-for="feedData in allFeedData" :key="feedData" :feedData="feedData"/>
        </div>
    </div>
    <div v-else>
        <FeedDetail :selectedFeed="selectedFeed" />
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import FeedCard from "./FeedCard.vue";
import FeedDetail from "./FeedDetail.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: "feed",
    setup() {
        let allFeedData = ref([]);
        let allFeedDataOriginal = ref([]);

        function search(e) {
            let searchWord = e.target.value;
            let result = allFeedDataOriginal.value.filter((feedData) => {
                return (feedData.title.includes(searchWord) || feedData.content.includes(searchWord));
            })
            this.allFeedData = [...result];
        }

        onMounted(() => {
            axios.get('/feedData.json')
            .then((result) => {
                allFeedData.value = result.data;
                allFeedDataOriginal.value = [...result.data];
            })
        })

        return {allFeedData, search}
    },
    components: {
        Navbar,
        FeedCard,
        FeedDetail
    },
    data() {
        return {
            showAll: true,
            selectedFeed: {},
        }
    },
}
</script>

<style>
.feedCards {
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.searchbar {
    margin-left: 25%;
    width: 50%;
}
</style>