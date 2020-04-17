<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="white" :flat="true">
      <v-toolbar-title class="edit__title pa-1">빙고 박물관</v-toolbar-title>
      <v-spacer />
      <div style="display:flex; flex-wrap:wrap; justify-content:flex-end">
        <div @click="first()" class="nav__text">메인으로</div>
      </div>
    </v-app-bar>
    <v-content style="background-color: #f1f1fa;">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  methods: {
    first() {
      this.$router.push("/");
    },
    list(res) {
      this.$router.push(`/museum/${res._id}`);
    }
  }
};
</script>

<style scoped>
.nav__text {
  font-family: "NanumSEB";
  color: #6c63ff;
  font-size: 17px;
  cursor: pointer;
  margin: 0 4px;
}
.edit__title {
  font-family: "NanumSEB";
  color: #6c63ff;
  cursor: pointer;
}
</style>