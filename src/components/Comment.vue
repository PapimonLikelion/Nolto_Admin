<template>
    <Navbar/>
    <h4 class="mt-3">{{$store.state.backendUrl}} 의 댓글</h4>
    <div class="searchbar input-group mt-3 mb-4">
        <input @input="search" type="text" class="form-control" placeholder="댓글 컨텐츠, 작성자, 생성날짜를 키워드로 검색">
    </div>
    <div class="feedCards mb-5">
        <CommentCard v-for="commentData in allCommentData" :key="commentData" :commentData="commentData"/>
    </div>
</template>

<script>
import Navbar from "./Navbar.vue";
import CommentCard from "./CommentCard.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    name: "comment",
    setup() {
        let allCommentData = ref([]);
        let allCommentDataOriginal = ref([]);

        function search(e) {
            let searchWord = e.target.value;

            let searchedComments = [];
            let result = allCommentDataOriginal.value.filter((CommentData) => {

                let commentsContainingSearchWord = CommentData.comments.filter((singleComment) => {
                    return (singleComment.content.includes(searchWord) || 
                            singleComment.createdAt.includes(searchWord) || 
                            singleComment.author.nickname.includes(searchWord))
                })

                if (commentsContainingSearchWord.length > 0) {
                    searchedComments.push(commentsContainingSearchWord);
                    return true;
                }
                return false;
            })

            let copiedResult = JSON.parse(JSON.stringify(result));
            for (let i=0; i<copiedResult.length; i++) {
                copiedResult[i].comments = searchedComments[i];
            }

            this.allCommentData = copiedResult;
        }

        onMounted(() => {
            axios.get('/commentData.json')
            .then((result) => {
                allCommentData.value = result.data;
                allCommentDataOriginal.value = [...result.data];
            })
        })

        return {allCommentData, search}
    },
    components: {
        Navbar,
        CommentCard
    },

}
</script>

<style>

</style>