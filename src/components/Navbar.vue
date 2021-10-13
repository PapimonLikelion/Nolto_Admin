<template>
    <nav class="adminNavbar navbar navbar-expand-lg navbar-light bg-light" style="background-color: #e3f2fd !important;">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Nolto Admin</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
            <li class="nav-item">
            <a class="nav-link active"><router-link to="/admin/feeds">피드</router-link></a>
            </li>
            <li class="nav-item">
            <a class="nav-link active"><router-link to="/admin/comments">댓글</router-link></a>
            </li>
            <li class="nav-item">
            <a class="nav-link active"><router-link to="/admin/users">유저</router-link></a>
            </li>
        </ul>
        </div>
    </div>
    </nav>
</template>

<script>
export default {
    name: "navbar"
}
</script>

<style>
.adminNavbar {
    display: flex !important; 
    align-content: flex-end;
}
</style>