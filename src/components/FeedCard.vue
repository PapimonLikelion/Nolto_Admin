<template>
    <div class="card feedcard">
        <div class="cardImg" v-if="thumbnailVideo"> 
            <video :src="feedData.thumbnailUrl" controls style="height: 100%; width: 90%;" />
        </div>
        <div class="cardImg" v-else>
            <img :src="feedData.thumbnailUrl" class="card-img-top"  style="height: 100%;  width: 90%;">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{feedData.title}}</h5>
            <p class="card-text">{{content_shorten}}</p>
            <button class="btn btn-warning" @click="showUpdateModal=true">수정하기</button>
            <button class="btn btn-danger" @click="showDeleteModal=true">삭제하기</button>
        </div>
    </div>

    <div class="updateModal" v-if="showUpdateModal">
        <img class="mb-2" :src="feedData.thumbnailUrl" style="width: 200px; height: 200px;">
        <input type="file" id="chooseFile" name="chooseFile" accept="image/*">
        <h5 class="mb-4">author: {{feedData.author.nickname}}</h5>

        <span class="input-group-text" id="basic-addon1">Title</span>
        <input type="text" class="mb-2 form-control" :value="feedData.title" aria-label="Username" aria-describedby="basic-addon1">

        <span class="input-group-text">Content</span>
        <textarea class="mb-2 form-control" aria-label="With textarea" :value="feedData.content" style="height: 100px"></textarea>

        <label class="input-group-text" for="inputGroupSelect01">Step</label>
        <select class="mb-2 form-select" id="inputGroupSelect01">
            <option selected>{{feedData.step}}</option>
            <option value="PROGRESS">PROGRESS</option>
            <option value="COMPLETE">COMPLETE</option>
        </select>

        <label class="input-group-text" for="inputGroupSelect01">Sos</label>
        <select class="mb-5 form-select" id="inputGroupSelect01">
            <option selected>{{feedData.sos}}</option>
            <option value="PROGRESS">true</option>
            <option value="COMPLETE">false</option>
        </select>

        <button class="btn btn-outline-dark" @click="sendUpdateToServer">예. 수정합니다.</button>
        <button class="btn btn-outline-dark" @click="showUpdateModal=false">아니요. 취소합니다</button>
    </div>

    <div class="deleteModal" v-if="showDeleteModal">
        <h4>{{feedData.title}}</h4>
        <p>정말로 삭제하시겠습니까?</p>
        <button class="btn btn-outline-dark" @click="sendDeleteToServer">예. 삭제합니다.</button>
        <button class="btn btn-outline-dark" @click="showDeleteModal=false">아니요. 취소합니다</button>
    </div>
</template>

<script>
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
        }
    },
    methods: {
        shorten(content) {
            if (content.length > 70) {
                return content.substring(0, 70) + "...";
            }
            return content;
        }, 
        sendDeleteToServer() {
            this.showDeleteModal=false
            console.log("axios delete");
        },
        checkIsVideo(content) {
            let extension = content.split('.').pop();
            if (extension == "mp4") {
                return true;
            }
            return false;
        }
    }

}
</script>

<style>
.cardImg {
    width: 100%;
    height: 160px;
}

.feedcard {
    width: 270px;
    margin: 15px;
}

</style>