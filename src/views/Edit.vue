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
            <template v-for="(word, i) in words">
              <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
              <v-list-item :key="`${i}-${word}`">
                <div>{{word}}</div>
                <v-spacer></v-spacer>
                <v-scroll-x-transition>
                  <v-icon color="red" @click="clear(i)">clear</v-icon>
                </v-scroll-x-transition>
              </v-list-item>
            </template>
          </v-card>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="white" :flat="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="#6c63ff" />
      <v-toolbar-title class="edit__title pa-1">빙고 제작소</v-toolbar-title>
    </v-app-bar>
    <v-content style="background-color: #f1f1fa">
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">안녕</v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
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
      bottom_flag: true
    };
  },
  created() {},
  methods: {
    wordCreate() {
      if (this.selectWord != "" && this.words.length != this.wordSize) {
        console.log("올림", this.wordSize, this.words.length);
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
        // 채팅창 전체높이 + 스크롤높이가 스크롤 전체높이와 같다면
        // 이는 스크롤이 바닥을 향해있다는것이므로
        // 스크롤 바닥을 유지하도록 플래그 설정
        this.bottom_flag = true;
      }
      if (this.pre_diffHeight > objDiv.scrollTop + objDiv.clientHeight) {
        // 스크롤이 한번이라도 바닥이 아닌 위로 상승하는 액션이 발생할 경우
        // 스크롤 바닥유지 플래그 해제
        this.bottom_flag = false;
      }
      //
      this.pre_diffHeight = objDiv.scrollTop + objDiv.clientHeight;
    }
  },
  updated: function() {
    var objDiv = document.getElementById("word__list");
    if (this.bottom_flag) {
      // 채팅창 스크롤 바닥 유지
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  },
  computed: {
    sizesCalculation() {
      console.log("잉");
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
.v-list {
  margin: auto;
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
  height: 53vh;
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
</style>