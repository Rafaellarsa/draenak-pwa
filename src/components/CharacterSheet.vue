<template>
  <v-container>
    <v-img v-if="imageURL" :src="imageURL" height="230"></v-img>
    <v-img
      v-else-if="this.character.characterImageURL"
      :src="this.character.characterImageURL"
      height="230"
    ></v-img>
    <v-img v-else src="@/assets/avatar-placeholder.gif" height="230"></v-img>
    <v-tabs-items v-model="currentTab" class="mb-4">
      <v-tab-item>
        <MainInfo
          :character="characterSheet"
          @update-sheet="onUpdateSheet"
          @on-image-change="image = arguments[0]"
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
import "firebase/storage";

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
      characterSheet: null,
      image: null
    };
  },
  computed: {
    imageURL() {
      if (this.image) {
        return URL.createObjectURL(this.image);
      } else {
        return "";
      }
    }
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

      if (modifiedSheet.characterImageURL) {
        this.updateImageCharacterCard(this.image);
      }
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
    },
    updateImageCharacterCard(imageFile) {
      // Verifica tamanho da imagem(bytes)
      if (imageFile.size > 10485760) {
        console.log("Imagem maior que 10MB");
      }
      // Verifica tipo da imagem
      var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
      if (!validImageTypes.includes(imageFile.type)) {
        console.log("É apenas permitido imagens do tipo GIF, JPEG e PNG");
      }

      // Montagem dos dados para a imagem no Firebase Storage
      var fileType = imageFile.name.substring(
        imageFile.name.lastIndexOf(".") + 1
      );
      var updateStorageRef = firebase
        .storage()
        .ref(
          "card_images/" +
            this.$store.state.user.user.id +
            "/" +
            this.character.id +
            "/" +
            "characterImage." +
            fileType
        );

      // Grava/Atualiza imagem no Storage
      updateStorageRef
        .put(imageFile)
        .then(() => {
          console.log("entrei aqui");
          // Recebe o link da imagem gravada no Storage e atualiza no RealTime
          updateStorageRef
            .getDownloadURL()
            .then(url => {
              console.log(url);
              firebase
                .database()
                .ref(
                  "characterSheets/" +
                    this.$store.state.user.user.id +
                    "/" +
                    this.character.id
                )
                .update({
                  characterImageURL: url
                });
            })
            .catch(error => {
              console.log(
                "Erro na gravação/atualização da imagem: " + error.message
              );
            });

          console.log("Imagem gravada/atualizada com sucesso");
        })
        .catch(error => {
          console.log(
            "Erro na gravação/atualização da imagem: " + error.message
          );
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
