<template>
  <div>
    <div class="commentAndReplies">
      <div class="commentItem">
        <p class="commentContent">{{ comment.comment.content }}</p>
        <p class="commentAuthor">{{ comment.comment.author.nickname }}</p>
        <p class="commentLikes">likes: {{ comment.comment.likes }}</p>
        <p class="commentHelper">도움: {{ comment.comment.helper }}</p>
        <button
          class="btn btn-danger commentDeleteBtn"
          @click="showDeleteModal = true"
        >
          삭제하기
        </button>
      </div>
      <div class="replyItems">
        <ul class="replies list-group">
          <li
            class="commentDetails list-group-item"
            v-for="reply in comment.replies"
            :key="reply"
          >
            <ReplyListItem
              :reply="reply"
              @replyDeleted="this.$emit('commentDeleted')"
            />
          </li>
        </ul>
      </div>
    </div>

    <div class="deleteModal" v-if="showDeleteModal">
      <h4>{{ comment.comment.content }}</h4>
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
import ReplyListItem from "./ReplyListItem.vue";

export default {
  name: "commentlistitem",
  props: {
    comment: Object,
  },
  components: {
    ReplyListItem,
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  methods: {
    sendDeleteToServer() {
      this.showDeleteModal = false;
      axios
        .delete(
          this.$store.state.backendUrl +
            "/admin/comments/" +
            this.comment.comment.id,
          {
            headers: {
              Authorization: "Bearer " + this.$store.state.adminToken,
            },
          }
        )
        .then(() => {
          this.$emit("commentDeleted");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
.commentAndReplies {
  display: flex;
  flex-direction: column;
}

.commentItem {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.commentContent {
  width: 60%;
}

.commentAuthor {
  width: 10%;
}

.commentLikes {
  width: 10%;
}

.commentHelper {
  width: 10%;
}

.commentDeleteBtn {
  width: 10%;
  height: 40px;
}

.replyItems {
  width: 100%;
}

.replies {
  width: 97%;
}
</style>