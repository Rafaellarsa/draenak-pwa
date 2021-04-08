<template>
  <v-col v-if="!selectedSheet">
    <v-row no-gutters>
      <h2>
        {{ party.name }}
      </h2>
    </v-row>
    <v-row class="mb-2" no-gutters>
      <p>
        Ambientação: {{ party.theme }}<br />
        Mestre: {{ party.masterName }}<br />
        Jogadores: {{ sheets.length }}<br />
        Pontos Iniciais: {{ party.points }}
      </p>
    </v-row>
    <v-divider></v-divider>
    <v-row class="mt-6" no-gutters>
      <h4>Fichas da Mesa</h4>
    </v-row>
    <!-- <v-sheet class="mx-auto" elevation="4" max-width="800"> -->
    <v-slide-group
      v-if="sheetsList"
      v-model="sheetsList"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item v-for="(sheet, index) in sheetsList" :key="index">
        <v-card color="#F8F3F3" @click="onClickSheet(sheet)" rounded>
          <v-img
            width="230"
            height="152"
            v-if="sheet.characterImageURL"
            :src="sheet.characterImageURL"
          ></v-img>
          <v-img
            width="230"
            height="152"
            v-else
            src="@/assets/avatar-placeholder.gif"
          ></v-img>

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
  </v-col>
  <CharacterSheet v-else :character="selectedSheet" />
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

import CharacterSheet from "@/components/CharacterSheet";

export default {
  name: "PartySheets",
  components: {
    CharacterSheet
  },
  props: {
    party: Object,
    sheets: Array
  },
  data() {
    return {
      modifiedParty: null,
      masterName: "",
      // completeSheets: null,
      sheetsList: [],
      selectedSheet: null
    };
  },
  computed: {
    sheetIds() {
      let sheetIds = [];
      for (let sheet of this.sheets) {
        sheetIds.push(sheet.characterSheetId);
      }
      return sheetIds;
    }
  },
  created() {
    this.modifiedParty = this.party;
    this.getUserById();
    this.getCharacterSheet();
  },
  methods: {
    getUserById() {
      firebase
        .database()
        .ref("users/" + this.modifiedParty.masterId)
        .once("value", snapshot => {
          this.masterName = snapshot.val().profile.userName;
          this.modifiedParty.masterName = snapshot.val().profile.userName;
        });
    },
    getCharacterSheet() {
      let sheetsList = [];

      firebase
        .database()
        .ref("parties/" + this.party.id + "/players")
        .once("value", snapshot => {
          snapshot.forEach(childSnapShot => {
            firebase
              .database()
              .ref(
                "characterSheets/" +
                  childSnapShot.key +
                  "/" +
                  childSnapShot.val().characterSheetId
              )
              .once("value", snapshot2 => {
                sheetsList.push(snapshot2.val());
              });

            this.sheetsList = sheetsList;
          });
        });
    },
    onClickSheet(sheet) {
      this.selectedSheet = sheet;
    }
  }
};
</script>

<style scoped>
h2 {
  color: #209898;
}
</style>
