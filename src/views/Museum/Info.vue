<template>
  <div style="width:100%; height:100%; padding: 16px;">
    <v-row class="fill-height">
      <div class="box">
        <img src="@/assets/arrow_back.svg" alt="화살표" width="32px" class="arrow" @click="meseum" />
        <div class="info__bingo" ref="printMe2">
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
            <div style="width:100%; display:flex; flex-wrap:wrap">
              <div class="info__text__box__download" @click="print" style="margin-right:6px">다운로드</div>
              <div class="info__text__box__delete" @click="deleteBingo">삭제</div>
            </div>
            <div class="info__text__box__image">
              <template v-if="random == 0">
                <img src="../../assets/bingo1.svg" alt="빙고" height="100%" class="bingo__image" />
              </template>
              <template v-if="random == 1">
                <img src="../../assets/bingo2.svg" alt="빙고" height="100%" class="bingo__image" />
              </template>
              <template v-if="random == 2">
                <img src="../../assets/bingo3.svg" alt="빙고" height="100%" class="bingo__image" />
              </template>
              <template v-if="random == 3">
                <img src="../../assets/bingo4.svg" alt="빙고" height="100%" class="bingo__image" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </v-row>
    <div class="modal" v-if="modalState">
      <div class="modal__content">
        <img src="@/assets/clear.svg" class="modal__image" width="26px" alt="뒤로가기" @click="deModal" />
        <div class="modal__title">빙고 삭제</div>
        <div class="modal__text">
          <v-text-field
            label="비밀번호"
            prepend-icon="vpn_key"
            color="#6c63ff"
            class="pa-0"
            :type="'password'"
            v-model="password"
            v-on:keyup.enter="upLoad"
            style="width:100%"
          ></v-text-field>
          <div class="errorMes">{{error}}</div>
        </div>
        <div style=" width:85%;">
          <v-btn
            @click="Delete()"
            color="#6c63ff"
            style="color:white; font-weight: bold;"
            width="100%"
            rounded
          >빙고 삭제</v-btn>
        </div>
        <div></div>
      </div>
      <div class="modal__shadow" @click="deModal"></div>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
  created() {
    this.random = Math.floor(Math.random() * 4);
    this.$store
      .dispatch("FindOne", { _id: this.$route.params._id })
      .then(res => {
        if (res.data.state == true) {
          this.Data = res.data.data[0];
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
      Data: [],
      random: 0,
      modalState: false,
      error: "",
      password: ""
    };
  },
  methods: {
    Delete() {
      this.$store
        .dispatch("Delete", {
          password: this.password
        })
        .then(res => {
          if (res.data.state == true) {
            this.deModal();
            this.$toasted.show("빙고를 성공적으로 삭제하였습니다.", {
              theme: "outline",
              position: "top-right",
              duration: 4000
            });
            this.$router.push("/museum");
          } else {
            this.error = res.data.result;
          }
        });
    },
    first() {
      this.$router.push("/");
    },
    meseum() {
      this.$router.push("/museum");
    },
    print() {
      var vm = this;
      let ele = this.$refs.printMe2;
      var image;
      html2canvas(ele).then(function(canvas) {
        var image = canvas.toDataURL("image/png"); //.replace("image/png", "image/octet-stream");
        var link = document.createElement("a");
        link.href = image;
        link.download = vm.Data.title + ".png";
        document.body.appendChild(link);
        link.click();
      });
    },
    deleteBingo() {
      this.modalState = true;
    },
    deModal() {
      this.password = "";
      this.modalState = false;
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
  width: fit-content;
  height: 100%;
  padding: 30px 30px 30px 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
}
.info__text {
  width: fit-content;
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
  width: 150px;
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
.info__text__box__delete {
  width: 90px;
  height: 50px;
  border-radius: 30px;
  border: 3px solid #f50057;
  color: #f50057;
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
.info__text__box__delete:hover {
  background-color: #f50057;
  color: white;
}
.info__text__box__image {
  box-sizing: border-box;
  padding: 20px 5px;
  height: calc(100% - 160px);
}
.modal__image {
  position: absolute;
  right: 30px;
  top: 20px;
  cursor: pointer;
}
.modal {
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal__content {
  width: 500px;
  background-color: white;
  height: 300px;
  z-index: 100;
  border-radius: 20px;
  display: flex;
  padding: 20px 0px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.modal__image {
  position: absolute;
  right: 30px;
  top: 20px;
  cursor: pointer;
}
.modal__text {
  width: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  flex-direction: column;
}
.modal__shadow {
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  z-index: 2;
}
.modal__title {
  font-family: "NanumSEB";
  color: #6c63ff;
  font-size: 26px;
  text-align: center;
  margin-top: 12px;
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
  .modal__content {
    width: 90%;
  }
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
    height: fit-content;
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
    height: fit-content;
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
  .bingo__image {
    height: 200px;
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
  .bingo__image {
    width: 100%;
  }
}
</style>