<template>
  <v-col>
    <v-row no-gutters>
      <h2>
        {{ party.name }}
      </h2>
    </v-row>
    <v-row class="mb-2" no-gutters>
      <p>
        Ambientação: {{ party.theme }}<br />
        Mestre: {{ party.master }}<br />
        Jogadores: {{ party.quantity }}<br />
        Pontos Iniciais: {{ party.points }}
      </p>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-6" no-gutters>
      <h4>Fichas da Mesa</h4>
    </v-row>
    <v-sheet class="mx-auto" elevation="4" max-width="800">
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item v-for="(sheet, index) in sheets" :key="index">
          <v-card color="white" @click="onClickSheet(sheet)" rounded>
            <v-img height="100" src="@/assets/avatar-placeholder.gif"></v-img>

            <div style="width:80%">
              <v-card-title class="headline" v-text="sheet.name"></v-card-title>

              <v-card-text>
                <div v-if="sheet.race">{{ sheet.race }}</div>
                <div v-else>Raça indefinida</div>
                <div v-if="sheet.age">{{ sheet.age }}</div>
                <div v-else>Idade indefinida</div>
              </v-card-text>
            </div>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-col>
  <!-- <CharacterSheet v-else :character="selectedSheet" /> -->
</template>

<script>
export default {
  name: "PartySheets",
  props: {
    party: Object
  }
};
</script>

<style scoped>
h2 {
  color: #209898;
}
</style>
