<template>
  <v-container v-if="!selectedSheet">
    <v-toolbar flat>
      <v-icon>mdi-arrow-left</v-icon>
      <v-spacer></v-spacer>
      <v-icon>mdi-cog</v-icon>
    </v-toolbar>
    <h1>Personagens</h1>

    <v-container>
      <v-row dense>
        <v-col v-for="(item, index) in sheets" :key="index" cols="12">
          <v-card :color="color" dark @click="onClickSheet(item)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ma-3" size="48">
                <v-img src="@/assets/default-user-image.png"></v-img>
              </v-avatar>

              <div>
                <v-card-title
                  class="headline"
                  v-text="item.name"
                ></v-card-title>

                <v-card-subtitle v-text="item.race"></v-card-subtitle>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>

  <v-container v-else>
    <v-toolbar flat>
      <v-icon @click="selectedSheet = null">mdi-arrow-left</v-icon>
      <v-spacer></v-spacer>
    </v-toolbar>
    <h1>{{ selectedSheet.name }}</h1>
    <h2>{{ selectedSheet.race }}</h2>
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
          name: "Fulaninha da Silva",
          race: "Elfa",
        },
        {
          name: "Sicrano de Almeida",
          race: "Anão",
        },
      ],
    };
  },
  methods: {
    onClickSheet(sheet) {
      this.selectedSheet = sheet;
    },
  },
};
</script>

<style></style>
