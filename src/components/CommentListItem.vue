<template>
    <p class="commentContent">{{comment.content}}</p>
    <p class="commentAuthor">{{comment.author.nickname}}</p>
    <p class="commentLikes">likes: {{comment.likes}}</p>
    <p class="commentHelper">도움: {{comment.helper}}</p>
    <button class="btn btn-danger" @click="showDeleteModal=true">삭제하기</button>

    <div class="deleteModal" v-if="showDeleteModal">
        <h4>{{comment.content}}</h4>
        <p>정말로 삭제하시겠습니까?</p>
        <button class="btn btn-outline-dark" @click="sendDeleteToServer">예. 삭제합니다.</button>
        <button class="btn btn-outline-dark" @click="showDeleteModal=false">아니요. 취소합니다</button>
    </div>
</template>

<script>
export default {
    name: "commentlistitem",
    props: {
        comment: Object,
    },
    data() {
        return {
            showDeleteModal: false,
        }
    },
    methods: {
        sendDeleteToServer() {
            this.showDeleteModal=false
            console.log("axios delete");
        }
    }
}
</script>

<style>
.commentDetails > .commentContent {
    width: 60%;
}

.commentDetails > .commentAuthor {
    width: 10%;
}

.commentDetails > .commentLikes {
    width: 10%;
}

.commentDetails > .commentHelper {
    width: 10%;
}

.commentDetails > button {
    width: 10%;
    height: 40px;
}
</style>