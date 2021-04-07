<template>
  <v-container v-if="!selectedSheet">
    <v-col>
      <v-row no-gutters>
        <h2>
          {{ selectedParty.name }}
        </h2>
      </v-row>
      <v-row no-gutters>
        <p>
          Amientação: {{ selectedParty.theme }}<br />
          Mestre: {{ selectedParty.master }}<br />
          Jogadores: {{ selectedParty.quantity }}<br />
          Pontos Iniciais: {{ selectedParty.points }}
        </p>
      </v-row>
      <v-divider></v-divider>
      <v-row no-gutters>
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
                <v-card-title
                  class="headline"
                  v-text="sheet.name"
                ></v-card-title>

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
  </v-container>
  <CharacterSheet v-else :character="selectedSheet" />
</template>
