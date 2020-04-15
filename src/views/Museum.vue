<template>
  <v-app id="inspire">
    <v-app-bar app clipped-left color="white" :flat="true">
      <v-toolbar-title class="edit__title pa-1" @click="main()">빙고 박물관</v-toolbar-title>
      <v-spacer />
      <div style="display:flex; flex-wrap:wrap; justify-content:flex-end">
        <div @click="first()" class="nav__text">메인으로</div>
      </div>
    </v-app-bar>
    <v-content style="background-color: #f1f1fa;">
      <v-container fluid>
        <v-row class="fill-height card__wrap">
          <div v-for="(v,i) in List" :key="i" class="card">
            <div>
              <div class="card__title">토트넘 빙고</div>
              <div class="card__Writer">염태민</div>
            </div>
            <div
              style="width:100%; display:flex; justify-content:space-between; align-items:flex-end"
            >
              <div class="card__day">{{v.time}}</div>
              <div v-if="v.wordSize == 4" class="card__bingo__size" style="color: #BE52F2">2x2</div>
              <div v-if="v.wordSize == 9" class="card__bingo__size" style="color: #FFCF5C">3x3</div>
              <div v-if="v.wordSize == 16" class="card__bingo__size" style="color: #0084F4">4x4</div>
              <div v-if="v.wordSize == 25" class="card__bingo__size" style="color: #6979F8">5x5</div>
              <div v-if="v.wordSize == 36" class="card__bingo__size" style="color: #00C48C">6x6</div>
            </div>
          </div>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("FindAll", { wordSize: this.wordSize }).then(res => {
      if (res.data.state == true) {
        this.List = res.data.data;
        console.log(this.List);
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
      List: []
    };
  },
  methods: {
    first() {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.card {
  background-color: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  min-width: 300px;
  height: 160px;
  border-radius: 10px;
  padding: 17px 20px;
  margin: 10px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
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
</style>