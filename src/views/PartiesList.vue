<template>
  <v-container v-if="!selectedParty">
    <v-container>
      <v-row dense>
        <v-col v-for="(party, index) in parties" :key="index" cols="12">
          <v-card color="white" @click="onClickParty(party)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ma-3" size="48">
                <v-img src="@/assets/avatar-placeholder.gif"></v-img>
              </v-avatar>

              <div style="width: 80%">
                <v-card-title
                  class="headline"
                  v-text="party.name"
                ></v-card-title>

                <v-card-text>
                  {{ party.theme }}<br />
                  {{ party.quantity + " jogadores" }}<br />
                  {{ party.points + " pontos" }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-btn class="mx-2 mb-1" fab small fixed bottom right color="secondary">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
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
  name: "PartiesList",
  components: {},
  data() {
    return {
      color: "#209898",
      parties: [
        {
          name: "Rolezinho virtual",
          theme: "Fantasia Medieval",
          quantity: 2,
          points: 120
        },
        {
          name: "Nightcity",
          theme: "Cyberpunk",
          quantity: 3,
          points: 200
        },
        {
          name: "Castelo Ratibum",
          theme: "Fantasia",
          quantity: 4,
          points: 135
        },
        {
          name: "Terra Média",
          theme: "Alta fantasia",
          quantity: 4,
          points: 230
        }
      ],
      selectedParty: null
    };
  },
  methods: {
    onClickParty(party) {
      this.selectedParty = party;
    }
  }
};
</script>

<style scoped>
h1 {
  color: #209898;
}
</style>
