<template>
  <div style="width:100%; height:100%; padding: 16px;">
    <v-row class="fill-height">
      <div class="box">
        <img src="@/assets/arrow_back.svg" alt="화살표" width="32px" class="arrow" @click="meseum" />
        <div class="info__bingo">
          <div class="bingo__frame">
            <div class="bingo__content">
              <template v-if="Data.wordSize == 4">
                <div v-for="(v,i) in Data.wordSize" :key="i+v" class="four__size">{{Data.words[i]}}</div>
              </template>
              <template v-if="Data.wordSize == 9">
                <div v-for="(v,i) in Data.wordSize" :key="i+v" class="nine__size">{{Data.words[i]}}</div>
              </template>
              <template v-if="Data.wordSize == 16">
                <div
                  v-for="(v,i) in Data.wordSize"
                  :key="i+v"
                  class="sixteen__size"
                >{{Data.words[i]}}</div>
              </template>
              <template v-if="Data.wordSize == 25">
                <div
                  v-for="(v,i) in Data.wordSize"
                  :key="i+v"
                  class="twentyFive__size"
                >{{Data.words[i]}}</div>
              </template>
              <template v-if="Data.wordSize == 36">
                <div
                  v-for="(v,i) in Data.wordSize"
                  :key="i+v"
                  class="thirtySix__size"
                >{{Data.words[i]}}</div>
              </template>
            </div>
          </div>
        </div>
        <div class="info__text">
          <div class="info__text__box">
            <div class="info__text__box__title">{{Data.title}}</div>
            <div class="info__text__box__username">작성자 : {{Data.username}}</div>
            <div class="info__text__box__time">작성일 : {{Data.time}}</div>
            <div class="info__text__box__download">다운로드</div>
          </div>
        </div>
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
          this.Data = res.data.data[0];
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
  display: flex;
  justify-content: center;
}
.arrow {
  position: absolute;
  top: 40px;
  left: 35px;
  cursor: pointer;
}
.info__bingo {
  width: 50%;
  height: 100%;
  padding: 30px 30px 30px 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
}
.info__text {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.info__text__box {
  width: 100%;
  height: 500px;
}
.bingo__frame {
  position: relative;
  width: 500px;
  border: 1px solid black;
}
.bingo__frame:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.bingo__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.four__size {
  width: 50%;
  height: 50%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.nine__size {
  width: 33.333333%;
  height: 33.33333%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.sixteen__size {
  width: 25%;
  height: 25%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.twentyFive__size {
  width: 20%;
  height: 20%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.thirtySix__size {
  width: 16.6666666%;
  height: 16.6666666%;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.info__text__box__title {
  font-size: 28px;
  font-family: "NanumSEB";
  color: #000000;
}
.info__text__box__username {
  font-size: 20px;
  font-family: "NanumSEB";
  color: #000000;
}
.info__text__box__time {
  font-size: 20px;
  font-family: "NanumSEB";
  color: #000000;
}
.info__text__box__download {
  width: 160px;
  height: 50px;
  border-radius: 30px;
  border: 3px solid #6c63ff;
  color: #6c63ff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-family: "NanumSEB";
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  margin-top: 5px;
  transition: 0.2s;
}
.info__text__box__download:hover {
  background-color: #6c63ff;
  color: white;
}
@media screen and (max-width: 1200px) {
  .bingo__frame {
    width: 400px;
  }
  .info__text__box {
    height: 400px;
  }
}
@media screen and (max-width: 900px) {
  .bingo__frame {
    width: 330px;
  }
  .info__text__box {
    height: 330px;
  }
}
@media screen and (max-width: 768px) {
  .info__bingo {
    width: 100%;
    height: 50%;
    justify-content: center;
    align-items: flex-end;
  }
  .info__text {
    width: 100%;
    height: 55%;
    justify-content: center;
  }
  .box {
    flex-direction: column;
  }
  .bingo__frame {
    width: 300px;
  }
  .info__bingo > * {
    font-size: 14px;
  }
  .info__text__box {
    width: 100%;
    height: 100%;
    padding: 0px 30px;
  }
}
@media screen and (max-width: 400px) {
  .bingo__frame {
    width: 100%;
  }
  .info__bingo {
    align-items: flex-start;
    justify-content: center;
    height: fit-content;
    padding-top: 60px;
    padding-bottom: 15px;
  }
  .info__bingo > * {
    font-size: 12px;
  }
  .info__text__box {
    width: 100%;
    padding: 0px 28px;
  }
}
</style>