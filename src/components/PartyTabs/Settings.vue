<template>
  <v-col>
    <input
      @change="onImageChange"
      type="file"
      id="image"
      style="display: none"
    />
    <v-btn
      v-if="isGeneralInfoEditable"
      absolute
      right
      class="mr-8 edit-photo-button"
      @click="onClickImageButton()"
      fab
      small
      color="secondary"
    >
      <v-icon>
        mdi-camera
      </v-icon>
    </v-btn>
    <v-row no-gutters>
      <h2 v-if="!isGeneralInfoEditable">
        {{ modifiedParty.name }}
      </h2>
      <v-text-field
        class="party-name-field"
        v-else
        color="secondary"
        v-model="generalInfo.name"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-icon
        v-if="!isGeneralInfoEditable && party.isMaster"
        @click="isGeneralInfoEditable = true"
        >mdi-pencil</v-icon
      >
      <v-icon
        v-else-if="party.isMaster"
        @click="updateGeneralInfo()"
        color="secondary"
        >mdi-check</v-icon
      >
    </v-row>
    <v-row class="mb-2" no-gutters v-if="!isGeneralInfoEditable">
      <p>
        Ambientação: {{ modifiedParty.theme }}<br />
        Mestre: {{ masterName }}<br />
        Jogadores: {{ sheets.length }}<br />
        Pontos Iniciais: {{ modifiedParty.points }}
      </p>
    </v-row>
    <v-row class="mb-2" no-gutters v-else>
      <v-text-field
        dense
        prefix="Ambientação:"
        color="secondary"
        v-model="generalInfo.theme"
      ></v-text-field>
      <p style="line-height: 26px; margin: 0">
        Mestre: {{ masterName }}<br />
        Jogadores: {{ sheets.length }}
      </p>
      <v-text-field
        dense
        prefix="Pontos:"
        color="secondary"
        v-model="generalInfo.points"
        type="number"
      ></v-text-field>
      <v-btn
        color="red"
        block
        dark
        @click="isRemoveElementDialogVisible = true"
        depressed
        tile
        >Apagar mesa</v-btn
      >
    </v-row>
    <v-divider></v-divider>
    <v-row justify="space-between" class="mt-6" no-gutters>
      <h4>Ambientação</h4>
      <v-icon
        v-if="!isDescriptionEditable && party.isMaster"
        @click="isDescriptionEditable = true"
        >mdi-pencil</v-icon
      >
      <v-icon
        v-else-if="party.isMaster"
        @click="updateDescription()"
        color="secondary"
        >mdi-check</v-icon
      >
    </v-row>
    <v-row v-if="!isDescriptionEditable" no-gutters>
      <p>
        {{ party.description }}
      </p>
      <div class="empty-string" v-if="!modifiedParty.description">
        {{ modifiedParty.name + " ainda não tem texto de ambientação" }}
        <v-btn icon color="#9a9a9a" @click="ismessageDialogVisible = true"
          ><v-icon>mdi-information-outline</v-icon></v-btn
        >
      </div>
    </v-row>
    <v-row v-else class="mt-0" no-gutters>
      <v-textarea
        color="secondary"
        class="pt-1"
        v-model="description"
        label="Descrição da Ambientação"
      >
      </v-textarea>
    </v-row>

    <MessageDialog
      :is-dialog-visible="ismessageDialogVisible"
      title="Ambientação"
      message="Para adicionar ou editar a descrição da ambientação, clique no botão de editar"
      buttonText="Okay"
      @close-dialog="ismessageDialogVisible = false"
    ></MessageDialog>

    <RemoveElementDialog
      :isDialogVisible="isRemoveElementDialogVisible"
      :isParty="true"
      :id="party.id"
      @close-dialog="isRemoveElementDialogVisible = false"
    ></RemoveElementDialog>
  </v-col>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

import MessageDialog from "@/components/Dialogs/MessageDialog";
import RemoveElementDialog from "@/components/Dialogs/RemoveElementDialog";

export default {
  name: "Settings",
  components: {
    MessageDialog,
    RemoveElementDialog
  },
  props: {
    party: Object,
    sheets: Array
  },
  data() {
    return {
      modifiedParty: null,
      masterName: "",
      isGeneralInfoEditable: false,
      generalInfo: {
        name: "",
        theme: "",
        points: null
      },
      isDescriptionEditable: false,
      description: "",
      ismessageDialogVisible: false,
      isRemoveElementDialogVisible: false,
      imageURL: ""
    };
  },
  created() {
    this.modifiedParty = this.party;
    this.generalInfo = {
      name: this.party.name,
      theme: this.party.theme,
      points: this.party.points
    };
    if (this.party.description) {
      this.description = this.party.description;
    }
    this.getUserById();
  },
  methods: {
    updateGeneralInfo() {
      this.isGeneralInfoEditable = false;

      this.modifiedParty.partyImageURL = this.imageURL;
      this.modifiedParty.name = this.generalInfo.name;
      this.modifiedParty.theme = this.generalInfo.theme;
      this.modifiedParty.points = this.generalInfo.points;

      this.$emit("update-party", this.modifiedParty);
    },
    updateDescription() {
      this.isDescriptionEditable = false;

      this.modifiedParty.description = this.description;

      this.$emit("update-party", this.modifiedParty);
    },
    getUserById() {
      firebase
        .database()
        .ref("users/" + this.modifiedParty.masterId)
        .once("value", snapshot => {
          this.masterName = snapshot.val().profile.userName;
          this.modifiedParty.masterName = snapshot.val().profile.userName;
        });
    },
    onClickImageButton() {
      document.getElementById("image").click();
    },
    onImageChange(e) {
      const image = e.target.files[0];
      this.imageURL = URL.createObjectURL(image);
      this.$emit("on-image-change", image);
    }
  }
};
</script>
<style scoped>
h2 {
  color: #209898;
}
</style>

<style>
.theme--light.v-input.party-name-field input {
  color: #209898;
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
