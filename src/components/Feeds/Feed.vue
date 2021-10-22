<template>
  <Navbar />
  <h4 class="mt-3">{{ $store.state.backendUrl }} 의 피드</h4>
  <div class="searchbar input-group mt-3 mb-5">
    <input
      @input="search"
      type="text"
      class="form-control"
      placeholder="피드 제목, 컨텐츠를 키워드로 검색"
    />
  </div>
  <div class="feedCards">
    <FeedCard
      v-for="feedData in allFeedData"
      :key="feedData"
      :feedData="feedData"
      @feedDeleted="deleteFeed($event)"
      @feedUpdated="getFeeds()"
    />
  </div>
</template>

<script>
import Navbar from "../Navbar.vue";
import FeedCard from "./FeedCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import store from "../../store.js";

export default {
  name: "feed",
  setup() {
    let allFeedData = ref([]);
    let allFeedDataOriginal = ref([]);

    function search(e) {
      let searchWord = e.target.value;
      let result = allFeedDataOriginal.value.filter((feedData) => {
        return (
          feedData.title.includes(searchWord) ||
          feedData.content.includes(searchWord)
        );
      });
      this.allFeedData = [...result];
    }

    function deleteFeed(id) {
      let updatedAllFeedData = allFeedData.value.filter((feedData) => {
        return feedData.id != id;
      });
      this.allFeedData = [...updatedAllFeedData];

      let updatedAllFeedDataOriginal = allFeedDataOriginal.value.filter(
        (feedData) => {
          return feedData.id != id;
        }
      );
      this.allFeedDataOriginal = [...updatedAllFeedDataOriginal];
    }

    function getFeeds() {
      axios
        .get(store.state.backendUrl + "/admin/feeds", {
          headers: {
            Authorization: "Bearer " + store.state.adminToken,
          },
        })
        .then((result) => {
          allFeedData.value = result.data;
          allFeedDataOriginal.value = [...result.data];
        })
        .catch((result) => {
          alert(result);
        });
    }

    onMounted(() => {
      getFeeds();
    });

    return { allFeedData, search, deleteFeed, getFeeds };
  },
  components: {
    Navbar,
    FeedCard,
  },
  data() {
    return {};
  },
};
</script>

<style>
.feedCards {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}

.searchbar {
  margin-left: 25%;
  width: 50%;
}
</style>