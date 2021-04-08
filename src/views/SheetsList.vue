<template>
  <v-container v-if="!selectedSheet">
    <v-container>
      <v-row dense>
        <v-col v-for="(sheet, index) in sheets" :key="index" cols="12">
          <v-card color="#F8F3F3" @click="onClickSheet(sheet)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-img
                v-if="sheet.characterImageURL"
                :src="sheet.characterImageURL"
                height="138"
                width="95"
              ></v-img>
              <v-img
                v-else
                src="@/assets/avatar-placeholder.gif"
                height="138"
                width="95"
              ></v-img>

              <div style="width: 80%">
                <v-card-title
                  class="headline"
                  v-text="sheet.name"
                ></v-card-title>

                <v-card-text>
                  <div v-if="sheet.race">{{ sheet.race }}</div>
                  <div v-else>Raça indefinida</div>
                  <div v-if="sheet.age">{{ sheet.age }}</div>
                  <div v-else>Idade indefinida</div>
                  <div v-if="sheet.party">
                    {{ "Mesa: " + sheet.party.partyName }}
                  </div>
                  <div v-else>Mesa não escolhida</div>
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-btn
      @click="onClickNewSheet()"
      class="mx-2 mb-1"
      fab
      small
      fixed
      bottom
      right
      color="primary"
    >
      <v-icon>
        mdi-plus
      </v-icon>
    </v-btn>

    <NewSheetDialog
      :is-dialog-visible="isDialogVisible"
      :parties="partiesList"
      @close-dialog="onCloseDialog()"
      @update-sheets-list="getSheetsList()"
    ></NewSheetDialog>
  </v-container>

  <CharacterSheet v-else :character="selectedSheet" :parties="partiesList" />
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

import CharacterSheet from "@/components/CharacterSheet";
import NewSheetDialog from "@/components/Dialogs/NewSheetDialog";

export default {
  name: "SheetsList",
  components: {
    CharacterSheet,
    NewSheetDialog
  },
  data() {
    return {
      isDialogVisible: false,
      selectedSheet: null,
      sheets: null,
      partiesList: null
    };
  },
  mounted() {
    this.getSheetsList();
    this.getPartiesList();
  },
  methods: {
    getSheetsList() {
      let cardsList = [];

      firebase
        .database()
        .ref("characterSheets/" + this.$store.state.user.user.id)
        .once("value", snapshot => {
          snapshot.forEach(item => {
            let cardsValue = item.val();
            cardsList.push(cardsValue);
          });
        });

      this.sheets = cardsList;
    },
    getPartiesList() {
      let partiesList = [];

      firebase
        .database()
        .ref("userParties/players/" + this.$store.state.user.user.id)
        .once("value", snapshot => {
          snapshot.forEach(item => {
            firebase
              .database()
              .ref("parties/" + item.key)
              .once("value", snapshot2 => {
                let party = {
                  partyId: item.key,
                  partyName: snapshot2.val().name
                };
                partiesList.push(party);
              });
          });
        });

      this.partiesList = partiesList;
    },
    onClickSheet(sheet) {
      this.selectedSheet = sheet;
    },
    onClickNewSheet() {
      this.isDialogVisible = true;
    },
    onCloseDialog() {
      this.isDialogVisible = false;
    }
  }
};
</script>

<style scoped>
.v-image {
  border-top-left-radius: 15px !important;
  border-bottom-left-radius: 15px !important;
}

.v-card {
  border-radius: 15px !important;
}

.v-application .headline {
  font-size: 1.125rem !important;
  font-weight: 500 !important;
  padding-bottom: 0 !important;
}
</style>
