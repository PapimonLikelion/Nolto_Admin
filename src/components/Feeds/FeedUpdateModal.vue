<template>
  <div>
    <img class="mb-2 updateModalOriginalImage" :src="thumbnailUrl" />
    <input
      type="file"
      accept="image/*"
      @change="changedThumbnail"
    />

    <h5 class="mb-4">author: {{ author.nickname }}</h5>

    <span class="input-group-text">Title</span>
    <input type="text" class="mb-2 form-control" v-model="title" />

    <span class="input-group-text">Content</span>
    <textarea
      class="mb-2 form-control"
      style="height: 100px"
      v-model="content"
    />

    <Tech :techs="techs" @techChanged="changedTechs($event)" />

    <label class="input-group-text">Sos</label>
    <select class="mb-2 form-select" v-model="sos">
      <option selected>{{ sos }}</option>
      <option value="true" v-if="sos == false">true</option>
      <option value="false" v-else>false</option>
    </select>

    <label class="input-group-text">Step</label>
    <select class="mb-2 form-select" v-model="step">
      <option selected>{{ step }}</option>
      <option value="PROGRESS" v-if="step == 'COMPLETE'">PROGRESS</option>
      <option value="COMPLETE" v-else>COMPLETE</option>
    </select>

    <div v-if="checkDeployedUrlReq()">
      <span class="input-group-text">DeployedUrl</span>
      <input type="text" class="mb-2 form-control" v-model="deployedUrl" />
    </div>

    <span class="input-group-text">StorageUrl</span>
    <input type="text" class="mb-5 form-control" v-model="storageUrl" />

    <button class="btn btn-outline-dark" @click="sendUpdateToServer">
      예. 수정합니다.
    </button>
    <button
      class="btn btn-outline-dark"
      @click="showUpdateModal = this.$emit('updateModalClose')"
    >
      아니요. 취소합니다
    </button>
  </div>
</template>

<script>
import axios from "axios";
import Tech from "./FeedTech.vue";

export default {
  name: "feedupdatemodal",
  props: {
    feedData: Object,
  },
  data() {
    return {
      author: this.feedData.author,
      title: this.feedData.title,
      content: this.feedData.content,
      sos: this.feedData.sos,
      step: this.feedData.step,
      storageUrl: this.feedData.storageUrl,
      deployedUrl: this.feedData.deployedUrl,
      thumbnailUrl: this.feedData.thumbnailUrl,
      techs: this.feedData.techs,
      thumbnail: undefined,
      techIds: undefined,
    };
  },
  components: {
    Tech,
  },
  methods: {
    checkDeployedUrlReq() {
      return this.step == "COMPLETE";
    },
    changedThumbnail(event) {
      this.thumbnail = event.target.files[0];
      this.thumbnailUrl = URL.createObjectURL(this.thumbnail);
    },
    changedTechs(changedTechs) {
      this.techs = [...changedTechs];
    },
    sendUpdateToServer() {
      var updateFeedData = this.makeUpdateFormData();
      axios
        .put(
          this.$store.state.backendUrl + "/admin/feeds/" + this.feedData.id,
          updateFeedData,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.adminToken,
            },
          }
        )
        .then(() => {
          this.$emit("feedUpdated");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
      this.$emit("updateModalClose");
    },
    makeUpdateFormData() {
      var updateFormData = new FormData();
      updateFormData.append("title", this.title);
      updateFormData.append("content", this.content);
      updateFormData.append("sos", this.sos);
      updateFormData.append("step", this.step);
      if (this.step == "COMPLETE") {
        updateFormData.append("deployedUrl", this.deployedUrl);
      }
      updateFormData.append("storageUrl", this.storageUrl);
      if (this.thumbnail != undefined) {
        updateFormData.append("thumbnailImage", this.thumbnail);
      }
      this.techs.forEach((tech) => updateFormData.append("techs", tech.id));
      return updateFormData;
    },
  },
};
</script>

<style>
.updateModalOriginalImage {
  width: 100px;
  height: 100px;
}

.updateModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  border-radius: 10px;
  padding: 40px;
  width: 55%;
  background-color: rgb(228, 183, 69);
  height: 85%;
  overflow: hidden;
  overflow-y: scroll;
}
</style>