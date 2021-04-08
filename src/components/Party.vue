<template>
  <v-container>
    <v-img v-if="imageURL" :src="imageURL" height="230"></v-img>
    <v-img
      v-else-if="this.party.partyImageURL"
      :src="this.party.partyImageURL"
      height="230"
    ></v-img>
    <v-img v-else src="@/assets/avatar-placeholder.gif" height="230"></v-img>
    <v-tabs-items v-model="currentTab" class="mb-4">
      <v-tab-item>
        <Settings
          :party="party"
          :sheets="sheets"
          @update-party="onUpdateParty"
          @on-image-change="image = arguments[0]"
        ></Settings>
      </v-tab-item>
      <v-tab-item>
        <PartySheets
          :party="party"
          :sheets="sheets"
          @update-party="onUpdateParty"
        ></PartySheets>
      </v-tab-item>
    </v-tabs-items>
    <v-btn
      class="mx-1 mb-11"
      fab
      small
      fixed
      bottom
      right
      @click="isAddPlayerToPartyVisible = true"
      v-if="party.isMaster"
      color="secondary"
    >
      <v-icon>
        mdi-account-plus
      </v-icon>
    </v-btn>

    <v-footer padless app fixed>
      <v-tabs
        v-model="currentTab"
        grow
        background-color="#eeeeee"
        color="secondary"
      >
        <v-tab>
          <img
            src="@/assets/ancient-scroll.svg"
            alt="Pergaminho"
            width="33"
            height="33"
          />
        </v-tab>
        <v-tab>
          <img src="@/assets/group.svg" alt="Pessoas" width="33" height="33" />
        </v-tab>
      </v-tabs>
    </v-footer>
    <AddPlayerToPartyDialog
      :isDialogVisible="isAddPlayerToPartyVisible"
      :partyId="party.id"
      @close-dialog="isAddPlayerToPartyVisible = false"
    ></AddPlayerToPartyDialog>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

import PartySheets from "@/components/PartyTabs/PartySheets";
import Settings from "@/components/PartyTabs/Settings";
import AddPlayerToPartyDialog from "@/components/Dialogs/AddPlayerToPartyDialog";

export default {
  name: "Party",
  components: {
    PartySheets,
    Settings,
    AddPlayerToPartyDialog
  },
  props: {
    party: Object
  },
  data() {
    return {
      currentTab: null,
      characterParties: null,
      image: null,
      isAddPlayerToPartyVisible: false,
      sheets: null
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
    this.characterParties = this.character;
    this.getSheetsByPartyId();
  },
  methods: {
    onUpdateParty(modifiedParty) {
      firebase
        .database()
        .ref("parties/" + modifiedParty.id)
        .update(modifiedParty)
        .catch(error => {
          console.log("Erro na atualização da mesa: " + error.message);
        });

      if (modifiedParty.partyImageURL) {
        this.updateImagePartyCard(this.image);
      }
    },
    updateImagePartyCard(imageFile) {
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
        .ref("party_images/" + this.party.id + "/" + "partyImage." + fileType);

      // Grava/Atualiza imagem no Storage
      updateStorageRef
        .put(imageFile)
        .then(() => {
          // Recebe o link da imagem gravada no Storage e atualiza no RealTime
          updateStorageRef
            .getDownloadURL()
            .then(url => {
              firebase
                .database()
                .ref("parties/" + this.party.id)
                .update({
                  partyImageURL: url
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
    },

    getSheetsByPartyId() {
      let cardsList = [];

      const ref = firebase
        .database()
        .ref("parties/" + this.party.id + "/players");
      ref.once("value", snapshot => {
        snapshot.forEach(childSnapshot => {
          var cardValue = {
            playerId: childSnapshot.key,
            characterSheetId: childSnapshot.val().characterSheetId
          };

          cardsList.push(cardValue);
        });
      });

      this.sheets = cardsList;
    }
  }
};
</script>

<style scoped>
h2 {
  color: #209898;
}

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
