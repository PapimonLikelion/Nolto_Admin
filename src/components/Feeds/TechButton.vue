<template>
  <button
    type="button"
    class="btn btn-info"
    @click="this.$emit('techDeleted', tech.id)"
  >
    {{ tech.text }}❌
  </button>
</template>

<script>
export default {
  name: "techbutton",
  props: {
    tech: Object,
  },
};
</script>

<style>
</style>