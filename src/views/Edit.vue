<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped width="300">
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
            prepend-icon="person"
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
            prepend-icon="person"
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
      <v-toolbar-title class="edit__title pa-1">빙고 제작소</v-toolbar-title>
      <v-spacer />
      <div @click="print()" class="nav__text">이미지 다운</div>
    </v-app-bar>
    <v-content style="background-color: #f1f1fa">
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
      selectSizes: "5x5",
      wordSize: 25,
      selectWord: "",
      sizes: ["2x2", "3x3", "4x4", "5x5", "6x6"],
      drawer: null,
      words: [],
      pre_diffHeight: 0,
      bottom_flag: true,
      output: null
    };
  },
  components: {
    draggable
  },
  created() {},
  methods: {
    print() {
      // window.html2canvas = html2canvas; //Vue.js 특성상 window 객체에 직접 할당해야한다.
      // let that = this;
      // let pdf = new jsPDF("p", "mm", "a4");
      // let canvas = pdf.canvas;
      // const pageWidth = 210; //캔버스 너비 mm
      // const pageHeight = 295; //캔버스 높이 mm
      // canvas.width = pageWidth;
      // let ele = this.$refs.printMe;
      // let width = ele.offsetWidth; // 셀렉트한 요소의 px 너비
      // let height = ele.offsetHeight; // 셀렉트한 요소의 px 높이
      // let imgHeight = (pageWidth * height) / width; // 이미지 높이값 px to mm 변환
      // if (!ele) {
      //   console.warn(selector + " is not exist.");
      //   return false;
      // }
      // //html2canvas(ele,{});
      // html2canvas(ele).then(function(canvas) {
      //   let position = 0;
      //   const imgData = canvas.toDataURL("image/png");
      //   pdf.addImage(
      //     imgData,
      //     "png",
      //     0,
      //     position,
      //     pageWidth,
      //     imgHeight,
      //     undefined,
      //     "slow"
      //   );
      //   //Paging 처리
      //   let heightLeft = imgHeight; //페이징 처리를 위해 남은 페이지 높이 세팅.
      //   heightLeft -= pageHeight;
      //   while (heightLeft >= 0) {
      //     position = heightLeft - imgHeight;
      //     pdf.addPage();
      //     pdf.addImage(imgData, "png", 0, position, pageWidth, imgHeight);
      //     heightLeft -= pageHeight;
      //   }
      //   pdf.save(that.selectTitle.toLowerCase() + ".png");
      // });
      var vm = this;
      let ele = this.$refs.printMe;
      var image;
      html2canvas(ele).then(function(canvas) {
        var image = canvas.toDataURL("image/png"); //.replace("image/png", "image/octet-stream");
        var link = document.createElement("a");
        link.href = image;
        link.download = "bingo.png";
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
}
.v-list {
  margin: auto;
}
.list-group {
  padding: 0px 12px 0px 12px;
}
.edit__title {
  font-family: "NanumSEB";
  color: #6c63ff;
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
.bingo__content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
}
.bingo__title {
  font-size: 44px;
  font-family: "NanumSB";
  margin-bottom: 10px;
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
@media screen and (max-width: 768px) {
  .bingo__frame {
    width: 90% !important;
  }
}
</style>