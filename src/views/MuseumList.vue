<template>
  <div class="museum__wrap"></div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("MuseumList");
  }
};
</script>

<style>
.museum__wrap {
  width: 100%;
}
</style>