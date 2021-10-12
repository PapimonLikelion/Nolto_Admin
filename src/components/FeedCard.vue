<template>
    <div class="card">
        <img :src="feedData.thumbnailUrl" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{feedData.title}}</h5>
            <p class="card-text">{{content_shorten}}</p>
            <button href="#" class="btn btn-primary">자세히 보기</button>
            <button class="btn btn-danger" @click="showDeleteModal=true">삭제하기</button>
        </div>
    </div>

    <div class="deleteModal" v-if="showDeleteModal">
        <h4>{{feedData.title}}</h4>
        <p>정말로 삭제하시겠습니까?</p>
        <button class="btn btn-outline-secondary" @click="sendDeleteToServer">예. 삭제합니다.</button>
        <button class="btn btn-outline-secondary" @click="showDeleteModal=false">아니요. 취소합니다</button>
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
            showDeleteModal: false,
        }
    },
    methods: {
        shorten(content) {
            if (content.length > 50) {
                return content.substring(0, 50) + "...";
            }
            return content;
        }, 
        sendDeleteToServer() {
            this.showDeleteModal=false
            console.log("axios delete");
        }
    }

}
</script>

<style>
.card > img {
    width: 100%;
    height: 160px;
}

.card {
    width: 270px;
    margin: 30px;
}

.deleteModal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    border-radius: 10px;
    padding: 40px;
    width: 500px;
    background-color: lightgray;
}
</style>