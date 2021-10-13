<template>
    <Navbar/>
    <h4 class="mt-3">{{$store.state.backendUrl}} 의 댓글</h4>
    <div class="searchbar input-group mt-3 mb-4">
        <input @input="search" type="text" class="form-control" placeholder="키워드로 검색" aria-label="키워드로 검색" aria-describedby="basic-addon2">
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

        function search() {
            // let searchWord = e.target.value;
            let result = allCommentDataOriginal.value.filter(() => {
                return true;
                // return (CommentData.title.includes(searchWord) || CommentData.content.includes(searchWord));
            })
            this.allCommentData = [...result];
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