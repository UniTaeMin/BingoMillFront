<template>
  <div style="width:100%;">
    <v-row class="fill-height card__wrap">
      <div v-for="(v,i) in List" :key="i" class="card" @click="list(v)">
        <div>
          <div class="card__title">{{v.title}}</div>
          <div class="card__Writer">{{v.username}}</div>
        </div>
        <div style="width:100%; display:flex; justify-content:space-between; align-items:flex-end">
          <div class="card__day">{{v.time}}</div>
          <div v-if="v.wordSize == 4" class="card__bingo__size" style="color: #BE52F2">2x2</div>
          <div v-if="v.wordSize == 9" class="card__bingo__size" style="color: #FFCF5C">3x3</div>
          <div v-if="v.wordSize == 16" class="card__bingo__size" style="color: #0084F4">4x4</div>
          <div v-if="v.wordSize == 25" class="card__bingo__size" style="color: #6979F8">5x5</div>
          <div v-if="v.wordSize == 36" class="card__bingo__size" style="color: #00C48C">6x6</div>
        </div>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("FindAll").then(res => {
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
    list(res) {
      this.$router.push(`/museum/${res._id}`);
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

.row {
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>