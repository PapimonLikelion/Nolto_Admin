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
            <a class="nav-link active" aria-current="page" href="#">피드</a>
            </li>
            <li class="nav-item">
            <a class="nav-link active" href="#">댓글</a>
            </li>
            <li class="nav-item">
            <a class="nav-link active" href="#">유저</a>
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