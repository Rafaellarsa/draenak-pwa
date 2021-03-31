<template>
  <v-container v-if="!selectedSheet">
    <h1>Personagens</h1>

    <v-container>
      <v-row dense>
        <v-col v-for="(item, index) in sheets" :key="index" cols="12">
          <v-card color="white" @click="onClickSheet(item)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ma-3" size="48">
                <v-img src="@/assets/default-user-image.png"></v-img>
              </v-avatar>

              <div>
                <v-card-title
                  class="headline"
                  v-text="item.name"
                ></v-card-title>

                <v-card-text>
                  {{ item.race }}<br />
                  {{ item.age + "anos" }}<br />
                  {{ "Mesa: " + item.party }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-btn class="mx-2 mb-10" fab small absolute bottom right color="primary">
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>
  </v-container>

  <v-container v-else>
    <v-toolbar flat>
      <v-icon @click="selectedSheet = null">mdi-arrow-left</v-icon>
      <v-spacer></v-spacer>
    </v-toolbar>
    <h1>{{ selectedSheet.name }}</h1>
    <h2>{{ selectedSheet.race }}</h2>

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
      color: "#3C096C",
      selectedSheet: null,
      sheets: [
        {
          name: "Galadriel",
          race: "Elfo",
          age: 120,
          party: "Terra Média"
        },
        {
          name: "Fulaninha da Silva",
          race: "Humano",
          age: 34,
          party: "Rolezinho Virtual"
        }
      ]
    };
  },
  methods: {
    onClickSheet(sheet) {
      this.selectedSheet = sheet;
    }
  }
};
</script>

<style></style>
