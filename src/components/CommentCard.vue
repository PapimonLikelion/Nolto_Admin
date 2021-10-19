<template>
    <div class="commentCard mt-5">
        <div class="commentFeed card">
            <div class="card-body">
                <h5 class="card-title">{{commentData.feed.title}}</h5>
                <p class="card-text">{{commentData.feed.content}}</p>
            </div>
        </div>
        <ul class="comments list-group">
            <li class="commentDetails list-group-item" v-for="comment in commentData.comments" :key="comment">
                <CommentListItem :comment="comment" @commentDeleted="this.$emit('commentDeleted');" />
            </li>
        </ul>
    </div>
</template>

<script>
import CommentListItem from './CommentListItem.vue';

export default {
    name: "commentcard",
    components: {
        CommentListItem,
    },
    props: {
        commentData: Object,
    },
}
</script>

<style>
.commentCard {
    width: 100%;
    height: 250px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

.commentFeed {
    width: 20%;
    margin-top: 0;
}

.comments {
    width: 75%;
    overflow:hidden;
    overflow-y: scroll;
}
</style>