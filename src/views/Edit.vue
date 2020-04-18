<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped width="300" style="z-index: 100">
      <!-- :floating="true" -->
      <v-list dense>
        <v-list-item>
          <v-text-field
            label="제목"
            prepend-icon="person"
            color="#6c63ff"
            class="pa-0"
            v-model="selectTitle"
          ></v-text-field>
        </v-list-item>
        <v-list-item>
          <v-select
            :items="sizes"
            label="크기"
            prepend-icon="crop_original"
            value="dd"
            class="pa-0"
            v-model="selectSizes"
            color="#6c63ff"
            item-color="#6c63ff"
          ></v-select>
        </v-list-item>
        <v-list-item>
          <v-text-field
            label="단어"
            prepend-icon="subject"
            color="#6c63ff"
            class="pa-0"
            v-model="selectWord"
            v-on:keyup.enter="wordCreate"
          ></v-text-field>
        </v-list-item>
        <div style="width:100%; padding: 0px 16px">
          <v-btn
            @click="wordCreate()"
            color="#6c63ff"
            style="color:white; font-weight: bold; margin-top:-5px;"
            width="100%"
            rounded
          >단어 추가</v-btn>
        </div>
        <div class="word__count">{{words.length}} / {{ sizesCalculation}}</div>
        <div id="word__list" class="word__list" @scroll="wordList">
          <v-card v-if="words.length > 0">
            <draggable
              class="list-group"
              tag="ul"
              v-model="words"
              @start="drag = true"
              @end="drag = false"
            >
              <template v-for="(word, i) in words">
                <v-list-item :key="`${i}-${word}`">
                  <div>{{word}}</div>
                  <v-spacer></v-spacer>
                  <v-scroll-x-transition>
                    <v-icon color="red" @click="clear(i)">clear</v-icon>
                  </v-scroll-x-transition>
                </v-list-item>
              </template>
            </draggable>
          </v-card>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="white" :flat="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="#6c63ff" />
      <v-toolbar-title class="edit__title pa-1" @click="main()">빙고 제작소</v-toolbar-title>
      <v-spacer />
      <div style="display:flex; flex-wrap:wrap; justify-content:flex-end">
        <div @click="modal()" class="nav__text">박물관업로드</div>
        <div @click="print()" class="nav__text">빙고다운</div>
      </div>
    </v-app-bar>
    <v-content style="background-color: #f1f1fa;">
      <v-container class="fill-height" fluid>
        <v-row
          align="center"
          justify="center"
          class="fill-height"
          style="flex-direction:column;"
          ref="printMe"
        >
          <div class="bingo__title">{{selectTitle}}</div>
          <div class="bingo__frame">
            <div class="bingo__content">
              <template v-if="wordSize == 4">
                <div v-for="(v,i) in wordSize" :key="i+v" class="four__size">{{words[i]}}</div>
              </template>
              <template v-if="wordSize == 9">
                <div v-for="(v,i) in wordSize" :key="i+v" class="nine__size">{{words[i]}}</div>
              </template>
              <template v-if="wordSize == 16">
                <div v-for="(v,i) in wordSize" :key="i+v" class="sixteen__size">{{words[i]}}</div>
              </template>
              <template v-if="wordSize == 25">
                <div v-for="(v,i) in wordSize" :key="i+v" class="twentyFive__size">{{words[i]}}</div>
              </template>
              <template v-if="wordSize == 36">
                <div v-for="(v,i) in wordSize" :key="i+v" class="thirtySix__size">{{words[i]}}</div>
              </template>
            </div>
          </div>
        </v-row>
      </v-container>
    </v-content>
    <div class="modal" v-if="modalState">
      <div class="modal__content">
        <img src="@/assets/clear.svg" class="modal__image" width="26px" alt="뒤로가기" @click="deModal" />
        <div class="modal__title">박물관 업로드</div>
        <div class="modal__text">
          <v-text-field
            label="닉네임"
            prepend-icon="people"
            color="#6c63ff"
            class="pa-0"
            v-model="username"
            v-on:keyup.enter="upLoad"
            style="width:100%"
          ></v-text-field>
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
          <v-text-field
            label="제목"
            prepend-icon="subject"
            color="#6c63ff"
            class="pa-0"
            v-model="title"
            v-on:keyup.enter="upLoad"
            style="width:100%"
          ></v-text-field>
          <div class="errorMes">{{error}}</div>
        </div>
        <div style=" width:85%;">
          <v-btn
            @click="upLoad()"
            color="#6c63ff"
            style="color:white; font-weight: bold;"
            width="100%"
            rounded
          >업로드</v-btn>
        </div>
        <div></div>
      </div>
      <div class="modal__shadow" @click="deModal"></div>
    </div>
  </v-app>
</template>

<script>
import draggable from "vuedraggable";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default {
  data() {
    return {
      selectTitle: "빙고",
      selectSizes: "4x4",
      wordSize: 16,
      selectWord: "",
      sizes: ["2x2", "3x3", "4x4", "5x5", "6x6"],
      drawer: null,
      words: [],
      pre_diffHeight: 0,
      bottom_flag: true,
      output: null,
      modalState: false,
      username: "",
      password: "",
      title: "",
      error: ""
    };
  },
  components: {
    draggable
  },
  created() {
    this.modalState = false;
  },
  methods: {
    upLoad() {
      this.$store
        .dispatch("UpLoad", {
          username: this.username,
          password: this.password,
          title: this.title,
          words: this.words,
          wordSize: this.wordSize
        })
        .then(res => {
          if (res.data.state == true) {
            this.deModal();
            this.username = "";
            this.password = "";
            this.title = "";
            this.error = "";
            this.words = [];
            this.$toasted.show("성공적으로 업로드 하였습니다.", {
              theme: "outline",
              position: "top-right",
              duration: 4000
            });
          } else {
            this.error = res.data.result;
          }
        });
    },
    modal() {
      this.modalState = true;
    },
    deModal() {
      this.username = "";
      this.password = "";
      this.title = "";
      this.modalState = false;
    },
    main() {
      this.$router.push("/");
    },
    print() {
      var vm = this;
      let ele = this.$refs.printMe;
      var image;
      html2canvas(ele).then(function(canvas) {
        var image = canvas.toDataURL("image/png"); //.replace("image/png", "image/octet-stream");
        var link = document.createElement("a");
        link.href = image;
        if (vm.selectTitle) {
          link.download = vm.selectTitle + ".png";
        } else {
          link.download = "bingo.png";
        }
        document.body.appendChild(link);
        link.click();
      });
    },
    wordCreate() {
      if (this.selectWord != "" && this.words.length != this.wordSize) {
        this.words.push(this.selectWord);
        this.selectWord = "";
      }
    },
    clear(number) {
      this.words.splice(number, 1);
    },
    wordList() {
      var objDiv = document.getElementById("word__list");
      if (objDiv.scrollTop + objDiv.clientHeight == objDiv.scrollHeight) {
        this.bottom_flag = true;
      }
      if (this.pre_diffHeight > objDiv.scrollTop + objDiv.clientHeight) {
        this.bottom_flag = false;
      }
      //
      this.pre_diffHeight = objDiv.scrollTop + objDiv.clientHeight;
    }
  },
  updated: function() {
    var objDiv = document.getElementById("word__list");
    if (this.bottom_flag) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  },
  computed: {
    sizesCalculation() {
      this.wordSize = 1;
      this.selectSizes.split("x").forEach(e => {
        this.wordSize *= e;
      });
      if (this.words.length > this.wordSize) {
        this.words.splice(this.wordSize);
      }
      return this.wordSize;
    }
  }
};
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.nav__text {
  font-family: "NanumSEB";
  color: #6c63ff;
  font-size: 17px;
  cursor: pointer;
  margin: 0 4px;
}
.v-list {
  margin: auto;
}
.list-group {
  padding: 0px 12px 0px 12px;
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
  width: 40%;
  background-color: white;
  height: 450px;
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
.edit__title {
  font-family: "NanumSEB";
  color: #6c63ff;
  cursor: pointer;
}
.word__count {
  width: 100%;
  text-align: right;
  margin-bottom: 3px;
  padding: 0px 16px;
  margin-top: 12px;
}
.word__list {
  padding: 8px 16px;
  height: 50vh;
  overflow-y: auto;
}
.word__list::-webkit-scrollbar {
  background: white;
  width: 5px;
  border-radius: 30px;
  height: 3px;
}
.word__list::-webkit-scrollbar-thumb {
  background: #6c63ff;
  border-radius: 30px;
}
.bingo__frame {
  position: relative;
  width: 35%;
  border: 1px solid black;
}
.bingo__frame:before {
  content: "";
  display: block;
  padding-top: 100%;
}
.bingo__title {
  font-size: 44px;
  font-family: "NanumSB";
  margin-bottom: 10px;
}
.bingo__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
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
.errorMes {
  font-size: 14px;
  color: red;
}
@media screen and (max-width: 768px) {
  .bingo__frame {
    width: 90% !important;
  }
  .modal__content {
    width: 75%;
  }
}
</style>