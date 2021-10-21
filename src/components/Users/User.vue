<template>
  <Navbar />
  <h4 class="mt-3">{{ $store.state.backendUrl }} 의 유저</h4>
  <div class="searchbar input-group mt-3 mb-5">
    <input
      @input="search"
      type="text"
      class="form-control"
      placeholder="닉네임, 소셜아이디, 소셜타입, 생성 날짜, 변경 날짜를 키워드로 검색"
    />
  </div>
  <div class="userCardInfo">
    <p>id</p>
    <p>nickname</p>
    <p>bio</p>
    <p>socialId</p>
    <p>socialType</p>
    <p>image</p>
    <p>createdAt</p>
    <p>modifiedAt</p>
    <p>삭제버튼</p>
  </div>
  <div class="userCards">
    <UserCard
      v-for="userData in allUserData"
      :key="userData"
      :userData="userData"
      @userDeleted="deleteUser($event)"
    />
  </div>
</template>

<script>
import Navbar from "../Navbar.vue";
import UserCard from "../Users/UserCard.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import store from "../../store.js";

export default {
  name: "user",
  setup() {
    let allUserData = ref([]);
    let allUserDataOriginal = ref([]);

    function search(e) {
      let searchWord = e.target.value.toLowerCase();
      let result = allUserDataOriginal.value.filter((userData) => {
        return (
          userData.nickname.toLowerCase().includes(searchWord) ||
          userData.socialId.toLowerCase().includes(searchWord) ||
          userData.socialType.toLowerCase().includes(searchWord) ||
          userData.createdAt.toLowerCase().includes(searchWord) ||
          userData.modifiedAt.toLowerCase().includes(searchWord)
        );
      });
      this.allUserData = [...result];
    }

    function deleteUser(id) {
      let updatedAllUserData = allUserData.value.filter((feedData) => {
        return feedData.id != id;
      });
      this.allUserData = [...updatedAllUserData];

      let updatedAllUserDataOriginal = allUserDataOriginal.value.filter(
        (feedData) => {
          return feedData.id != id;
        }
      );
      this.allUserDataOriginal = [...updatedAllUserDataOriginal];
    }

    onMounted(() => {
      axios
        .get(store.state.backendUrl + "/admin/users", {
          headers: {
            Authorization: "Bearer " + store.state.adminToken,
          },
        })
        .then((result) => {
          allUserData.value = result.data;
          allUserDataOriginal.value = [...result.data];
        })
        .catch((result) => {
          alert(result);
        });
    });

    return { allUserData, deleteUser, search };
  },
  components: {
    Navbar,
    UserCard,
  },
};
</script>

<style>
.userCardInfo {
  margin-left: 10%;
  margin-right: 10%;
  height: 30px;
  display: flex;
  justify-content: space-evenly;
}
.userCardInfo > p {
  width: 70px;
  font-weight: bold;
}

.userCards {
  margin-left: 10%;
  margin-right: 10%;
  display: flex;
  flex-direction: column;
}
</style>