<template>
  <v-container v-if="!selectedParty">
    <v-toolbar flat>
      <v-icon>mdi-arrow-left</v-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-cog</v-icon>
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
          quantity: "2 participantes",
        },
        {
          name: "Gente entediada",
          quantity: "5 participantes",
        },
      ],
      selectedParty: null,
    };
  },
  methods: {
    onClickParty(party) {
      this.selectedParty = party;
    },
  },
};
</script>

<style></style>
