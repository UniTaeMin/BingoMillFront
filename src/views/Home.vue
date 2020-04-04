<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped width="300">
      <!-- :floating="true" -->
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="white" :flat="true">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="#6c63ff" />
      <v-toolbar-title class="edit__title pa-1">빙고 제작소</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center"></v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      drawer: null,
      items: [
        { icon: "mdi-trending-up", text: "Most Popular" },
        { icon: "mdi-youtube-subscription", text: "Subscriptions" },
        { icon: "mdi-history", text: "History" },
        { icon: "mdi-playlist-play", text: "Playlists" },
        { icon: "mdi-clock", text: "Watch Later" }
      ],
      items2: [
        { picture: 28, text: "Joseph" },
        { picture: 38, text: "Apple" },
        { picture: 48, text: "Xbox Ahoy" },
        { picture: 58, text: "Nokia" },
        { picture: 78, text: "MKBHD" }
      ]
    };
  },
  created() {}
};
</script>

<style scoped>
.v-app-bar {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
}
.edit__title {
  font-family: "NanumSEB";
  color: #6c63ff;
}
</style>