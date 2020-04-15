<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
@font-face {
  font-family: "NanumSR";
  src: url("./assets/font/NanumSquareR.ttf") format("truetype");
  font-display: swap;
}
@font-face {
  font-family: "NanumSB";
  src: url("./assets/font/NanumSquareB.ttf") format("truetype");
  font-display: swap;
}
@font-face {
  font-family: "NanumSRB";
  src: url("./assets/font/NanumSquareRoundB.ttf") format("truetype");
  font-display: swap;
}
@font-face {
  font-family: "ProductSansM";
  src: url("./assets/font/ProductSans-Black.ttf") format("truetype");
  font-display: swap;
}
@font-face {
  font-family: "ProductSansR";
  src: url("./assets/font/ProductSans-Medium.ttf") format("truetype");
  font-display: swap;
}
@font-face {
  font-family: "NanumSEB";
  src: url("./assets/font/NanumSquareEB.ttf") format("truetype");
  font-display: swap;
}
* {
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}
body {
  margin: 0px;
  padding: 0px;
}
#app {
  width: 100%;
  height: 100vh;
}
.toasted-container.top-right {
  top: 7.5% !important;
  right: 1.5% !important;
}
.toasted.outline {
  border: 0px !important;
  color: #6c63ff !important;
}
.toasted-container {
  z-index: 299 !important;
}
/* vuetify setting */
/* .v-navigation-drawer__content {
  display: flex;
  justify-content: center;
  align-items: center;
}
.v-navigation-drawer__content > div {
  width: 100%;
} */
.v-navigation-drawer__content {
  padding: 20px 0px;
}
</style>
