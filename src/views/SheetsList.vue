<template>
  <v-container v-if="!selectedSheet">
    <v-container>
      <v-row dense>
        <v-col v-for="(sheet, index) in sheets" :key="index" cols="12">
          <v-card color="white" @click="onClickSheet(sheet)">
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-avatar class="ma-3" size="48">
                <v-img src="@/assets/default-user-image.png"></v-img>
              </v-avatar>

              <div>
                <v-card-title
                  class="headline"
                  v-text="sheet.name"
                ></v-card-title>

                <v-card-text>
                  {{ sheet.race }}<br />
                  {{ sheet.age + " anos" }}<br />
                  {{ "Mesa: " + sheet.party }}
                </v-card-text>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-btn class="mx-2 mb-1" fab small fixed bottom right color="primary">
      <v-icon @click="onClickNewSheet()">
        mdi-plus
      </v-icon>
    </v-btn>

    <NewSheetDialog
      :is-dialog-visible="isDialogVisible"
      @close-dialog="onCloseDialog()"
      @update-sheets-list="getSheetsList()"
    ></NewSheetDialog>
  </v-container>

  <CharacterSheet v-else :character="selectedSheet" />
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

import CharacterSheet from "@/components/CharacterSheet";
import NewSheetDialog from "@/components/NewSheetDialog";

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
      sheets: null
    };
  },
  mounted() {
    this.getSheetsList();
  },
  methods: {
    getSheetsList() {
      var cardsList = [];

      firebase
        .database()
        .ref("characterSheets/" + this.$store.state.user.user.id)
        .once("value", snapshot => {
          snapshot.forEach(item => {
            var cardsValue = item.val();
            cardsList.push(cardsValue);
          });
        });

      this.sheets = cardsList;
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

<style scoped></style>
