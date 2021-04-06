<template>
  <v-container>
    <v-img src="@/assets/avatar-placeholder.gif" height="230"></v-img>
    <v-tabs-items v-model="currentTab" class="mb-4">
      <v-tab-item>
        <MainInfo
          :character="characterSheet"
          @update-sheet="onUpdateSheet"
        ></MainInfo>
      </v-tab-item>
      <v-tab-item>
        <Inventory
          :character="characterSheet"
          @update-sheet="onUpdateSheet"
        ></Inventory>
      </v-tab-item>
      <v-tab-item>
        <Injuries
          :character="characterSheet"
          @update-sheet="onUpdateSheet"
        ></Injuries>
      </v-tab-item>
      <v-tab-item>
        <Notes
          :character="characterSheet"
          @update-sheet="onUpdateSheet"
        ></Notes>
      </v-tab-item>
    </v-tabs-items>
    <v-footer padless app fixed>
      <v-tabs v-model="currentTab" grow background-color="#eeeeee">
        <v-tab>
          <img alt="Avatar" width="33" height="33" src="@/assets/avatar.svg" />
        </v-tab>
        <v-tab>
          <img
            alt="Mochila"
            width="30"
            height="30"
            src="@/assets/backpack.svg"
          />
        </v-tab>
        <v-tab>
          <img
            alt="Curativo"
            width="33"
            height="33"
            src="@/assets/bandaid.svg"
          />
        </v-tab>
        <v-tab>
          <img alt="Livro" width="30" height="30" src="@/assets/book.svg" />
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

import MainInfo from "@/components/SheetTabs/MainInfo";
import Inventory from "@/components/SheetTabs/Inventory";
import Injuries from "@/components/SheetTabs/Injuries";
import Notes from "@/components/SheetTabs/Notes";

export default {
  name: "CharacterSheet",
  components: {
    MainInfo,
    Inventory,
    Injuries,
    Notes
  },
  props: {
    character: Object
  },
  data() {
    return {
      currentTab: null,
      characterSheet: null
    };
  },
  mounted() {
    this.characterSheet = this.character;
  },
  methods: {
    onUpdateSheet(modifiedSheet) {
      firebase
        .database()
        .ref(
          "characterSheets/" +
            this.$store.state.user.user.id +
            "/" +
            modifiedSheet.id
        )
        .update(modifiedSheet)
        .then(() => {
          this.getCharacterSheet();
        })
        .catch(error => {
          console.log("Erro na atualização da ficha: " + error.message);
          return "Erro na atualização da ficha: " + error.message;
        });

      // Caso tenha atualização da imagem pela atualização da ficha
      // if(imageFile){
      //     updateImageCharacterCard(imageFile,cardId);
      // }
    },
    getCharacterSheet() {
      firebase
        .database()
        .ref(
          "characterSheets/" +
            this.$store.state.user.user.id +
            "/" +
            this.character.id
        )
        .once("value", snapshot => {
          this.characterSheet = snapshot.val();
        });
    }
  }
};
</script>

<style scoped>
.v-image {
  margin-top: -16px !important;
  margin-left: -12px !important;
  margin-right: -12px !important;
}

.v-responsive {
  max-width: 100vw !important;
}
</style>
<style>
h2 {
  color: #5915c7;
}

p {
  line-height: 18.75px;
}

.expansion-panel {
  border-radius: 0;
  background-color: #eeeeee !important;
}

.expansion-panel-content {
  margin-left: -24px;
  margin-right: -24px;
}

.v-tabs-items {
  background-color: #eeeeee !important;
}

.v-slider {
  margin: 0 !important;
}
</style>
