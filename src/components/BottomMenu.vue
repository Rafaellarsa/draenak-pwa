<template>
  <v-footer padless app>
    <!-- <v-bottom-navigation> -->
    <v-tabs grow>
      <v-tab @click="onClickSheets()">Fichas</v-tab>
      <v-tab @click="onClickParties()">Mesas</v-tab>
    </v-tabs>
    <!-- </v-bottom-navigation> -->
  </v-footer>
</template>

<script>
export default {
    name: "BottomMenu",
    methods: {
        onClickParties() {
            this.$router.push('/parties-list');
        },
        onClickSheets() {
            this.$router.push('/sheets-list');
        }
    }
};
</script>

<style></style>
