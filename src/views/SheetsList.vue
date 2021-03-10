<template>
  <v-container>
    <v-toolbar flat>
      <v-icon>mdi-arrow-left</v-icon>
    </v-toolbar>
    <h1>Personagens</h1>

    <v-container>
      <v-row dense>
        <v-col v-for="(item, index) in items" :key="index" cols="12">
          <v-card :color="color" dark>
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

    <bottom-menu></bottom-menu>
  </v-container>
</template>

<script>
import BottomMenu from "@/components/BottomMenu";

export default {
  name: "SheetsList",
  components: {
    "bottom-menu": BottomMenu
  },
  data() {
    return {
      color: "#3C096C",
      items: [
        {
          name: "Fulaninha da Silva",
          race: "Elfa"
        },
        {
          name: "Sicrano de Almeida",
          race: "Anão"
        }
      ]
    };
  }
};
</script>

<style></style>
