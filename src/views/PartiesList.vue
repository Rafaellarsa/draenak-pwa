<template>
  <v-container v-if="!selectedParty">
    <v-toolbar flat>
      <v-spacer></v-spacer>
      <v-icon @click="onClickSettings()">mdi-cog</v-icon>
    </v-toolbar>
    <h1>Mesas</h1>

    <v-container>
      <v-row dense>
        <v-col v-for="(item, index) in parties" :key="index" cols="12">
          <v-card :color="color" dark @click="onClickParty(item)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ma-3" size="48">
                <v-img src="@/assets/default-user-image.png"></v-img>
              </v-avatar>

              <div>
                <v-card-title
                  class="headline"
                  v-text="item.name"
                ></v-card-title>

                <v-card-subtitle v-text="item.quantity"></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <v-container v-else>
    <v-toolbar flat>
      <v-icon @click="selectedParty = null">mdi-arrow-left</v-icon>
      <v-spacer></v-spacer>
    </v-toolbar>
    <h1>{{ selectedParty.name }}</h1>
    <h2>{{ selectedParty.quantity }}</h2>

    <v-row justify="center" class="ma-0">
      <v-expansion-panels>
        <v-expansion-panel v-for="(item, i) in 5" :key="i" class="ma-1">
          <v-expansion-panel-header :color="color"
            >Item</v-expansion-panel-header
          >
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SheetsList",
  components: {},
  data() {
    return {
      color: "#209898",
      parties: [
        {
          name: "Rolezinho virtual",
          quantity: "2 participantes"
        },
        {
          name: "Gente entediada",
          quantity: "5 participantes"
        }
      ],
      selectedParty: null
    };
  },
  methods: {
    onClickParty(party) {
      this.selectedParty = party;
    },
    onClickSettings() {
      this.$router.push("/settings");
    }
  }
};
</script>

<style></style>
