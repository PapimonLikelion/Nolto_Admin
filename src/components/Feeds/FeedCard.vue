<template>
  <div>
    <div class="card feedcard">
      <div class="cardImg" v-if="thumbnailVideo">
        <video
          :src="feedData.thumbnailUrl"
          controls
          class="thumbnailImage"
        />
      </div>
      <div class="cardImg" v-else>
        <img :src="feedData.thumbnailUrl" class="card-img-top thumbnailImage" />
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ feedData.title }}</h5>
        <p class="card-text mb-2">{{ content_shorten }}</p>
        <p class="card-text mb-0">views: {{ feedData.views }}</p>
        <p class="card-text mb-3">likes: {{ feedData.likes }}</p>
        <button class="btn btn-warning" @click="showUpdateModal = true">
          수정하기
        </button>
        <button class="btn btn-danger" @click="showDeleteModal = true">
          삭제하기
        </button>
      </div>
    </div>

    <div class="updateModal" v-if="showUpdateModal">
      <FeedUpdateModal
        :feedData="feedData"
        @updateModalClose="showUpdateModal = false"
        @feedUpdated="this.$emit('feedUpdated')"
      />
    </div>

    <div class="deleteModal" v-if="showDeleteModal">
      <h4>{{ feedData.title }}</h4>
      <p>정말로 삭제하시겠습니까?</p>
      <button class="btn btn-outline-dark" @click="sendDeleteToServer">
        예. 삭제합니다.
      </button>
      <button class="btn btn-outline-dark" @click="showDeleteModal = false">
        아니요. 취소합니다
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FeedUpdateModal from "./FeedUpdateModal.vue";

export default {
  name: "feedcard",
  props: {
    feedData: Object,
  },
  data() {
    return {
      content_shorten: this.shorten(this.feedData.content),
      thumbnailVideo: this.checkIsVideo(this.feedData.thumbnailUrl),
      showUpdateModal: false,
      showDeleteModal: false,
    };
  },
  components: {
    FeedUpdateModal,
  },
  methods: {
    shorten(content) {
      if (content.length > 70) {
        return content.substring(0, 70) + "...";
      }
      return content;
    },
    checkIsVideo(content) {
      let extension = content.split(".").pop();
      return extension == "mp4";
    },
    sendDeleteToServer() {
      this.showDeleteModal = false;
      axios
        .delete(
          this.$store.state.backendUrl + "/admin/feeds/" + this.feedData.id,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.adminToken,
            },
          }
        )
        .then(() => {
          this.$emit("feedDeleted", this.feedData.id);
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
.cardImg {
  width: 100%;
  height: 105px;
}

.feedcard {
  width: 270px;
  margin: 15px;
}

.thumbnailImage {
  height: 100px;
  width: 100px;
}
</style>