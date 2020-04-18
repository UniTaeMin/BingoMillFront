<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="white" :flat="true">
      <v-toolbar-title class="edit__title pa-1" @click="museum()">빙고 박물관</v-toolbar-title>
      <v-spacer />
      <div style="display:flex; flex-wrap:wrap; justify-content:flex-end">
        <div @click="first()" class="nav__text">메인으로</div>
      </div>
    </v-app-bar>
    <v-content style="background-color: #f1f1fa;">
      <transition name="fade">
        <router-view />
      </transition>
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
    },
    museum() {
      if (window.location.pathname != "/museum") {
        this.$router.push("/museum");
      }
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
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
  position: absolute;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
  transform: scale(1);
}
</style>