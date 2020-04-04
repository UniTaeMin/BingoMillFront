<template>
  <div class="home">
    <img src="../assets/bingoLanding.svg" alt="빙고 사진" class="landingImage" />
    <div class="home__title">빙고 제작소</div>
    <div class="home__start" @click="start">빙고 만들기</div>
    <div class="home__museum">빙고 박물관</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  methods: {
    start() {
      this.$router.push("/edit");
    }
  }
};
</script>
<style scoped>
.home {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.home__title {
  font-family: "NanumSEB";
  font-size: 40px;
  margin-top: 20px;
  margin-bottom: 12px;
}
.landingImage {
  width: 300px;
  pointer-events: none;
}
.home__start {
  width: 200px;
  height: 48px;
  color: #6c63ff;
  border-radius: 30px;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  border: 2px solid #6c63ff;
}
.home__museum {
  width: 200px;
  height: 48px;
  background-color: #6c63ff;
  border-radius: 30px;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 3px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  font-size: 18px;
}
@media screen and (max-width: 768px) {
  .landingImage {
    width: 80%;
  }
}
</style>