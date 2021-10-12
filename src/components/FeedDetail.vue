<template>
  {{selectedFeed.title}}
</template>

<script>
export default {
    name: "feedDetail", 
    props: {
      selectedFeed: Object,
    }
}
</script>

<style>

</style>