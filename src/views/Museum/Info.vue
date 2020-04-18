<template>
  <div style="width:100%; height:100%; padding: 16px;">
    <v-row class="fill-height">
      <div class="box">
        <img src="@/assets/arrow_back.svg" alt="화살표" width="32px" class="arrow" @click="meseum" />
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$route.params._id);
    this.$store
      .dispatch("FindOne", { _id: this.$route.params._id })
      .then(res => {
        if (res.data.state == true) {
          this.Data = res.data.data;
          console.log(this.Data);
        } else {
          this.$toasted.show("Error", {
            theme: "outline",
            position: "top-right",
            duration: 4000
          });
        }
      });
  },
  data() {
    return {
      Data: []
    };
  },
  methods: {
    first() {
      this.$router.push("/");
    },
    meseum() {
      this.$router.push("/museum");
    }
  }
};
</script>

<style scoped>
.card {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  max-width: 300px;
  min-width: 300px;
  height: 160px;
  border-radius: 10px;
  padding: 17px 20px;
  margin: 10px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: relative;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.267);
}
.card__title {
  font-size: 24px;
  font-family: "NanumSEB";
}
.card__Writer {
  font-size: 16px;
  font-family: "NanumSR";
}
.card__day {
  font-size: 16px;
  font-family: "NanumSB";
}
.card__bingo__size {
  font-size: 30px;
  font-family: "NanumSEB";
  height: fit-content;
  line-height: 1;
}
.card__wrap {
  width: 90%;
  margin: 0 auto;
  height: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
}
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
.row {
  margin-left: auto !important;
  margin-right: auto !important;
}
.box {
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 30px;
}
.arrow {
  position: absolute;
  top: 40px;
  left: 40px;
}
</style>