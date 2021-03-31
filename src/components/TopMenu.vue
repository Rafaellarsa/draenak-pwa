<template>
  <v-app-bar flat color="#eeeeee">
    <v-spacer style="width: 24px"></v-spacer>
    <v-tabs centered grow :color="color" v-model="tab">
      <v-tabs-slider :color="color"></v-tabs-slider>
      <v-tab @click="onClickSheets()">Fichas</v-tab>
      <v-tab @click="onClickParties()">Mesas</v-tab>
    </v-tabs>
    <v-icon @click="onClickSettings()">mdi-dots-vertical</v-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "BottomMenu",
  data() {
    return {
      tab: 0
    };
  },
  computed: {
    color() {
      if (this.tab === 0) {
        return "#5915C7";
      } else {
        return "#209898";
      }
    }
  },
  methods: {
    onClickParties() {
      if (this.$router.currentRoute.name !== "parties-list") {
        this.$router.push("/parties-list");
      }
    },
    onClickSheets() {
      if (this.$router.currentRoute.name !== "sheets-list") {
        this.$router.push("/sheets-list");
      }
    },
    onClickSettings() {
      this.$router.push("/settings");
    }
  }
};
</script>

<style></style>
