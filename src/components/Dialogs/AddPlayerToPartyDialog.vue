<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>Adicionar Jogador</v-card-title>
      <v-card-text>
        <v-text-field
          label="Email do Jogador"
          v-model="email"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('close-dialog')">Cancelar</v-btn>
        <v-btn @click="onClickSendButton()">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AddPlayerToPartyDialog",
  props: {
    isDialogVisible: Boolean,
    partyId: String
  },
  data() {
    return {
      email: "",
      id: null,
      isVisible: false
    };
  },
  watch: {
    isDialogVisible(newValue) {
      this.isVisible = newValue;
    },
    isVisible(newValue) {
      if (!newValue) {
        this.$emit("close-dialog");
      }
    }
  },
  methods: {
    onClickSendButton() {
      this.isVisible = false;
      this.addPlayerToParty();
    },
    addPlayerToParty() {
      firebase
        .database()
        .ref("users")
        .once("value", snapshot => {
          snapshot.forEach(childSnapshot => {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val().profile.userEmail;

            if (childData === this.email) {
              this.id = childKey;
            }
          });
        })
        .then(() => {
          firebase
            .database()
            .ref("parties/" + this.partyId + "/players/" + this.id)
            .update({
              playerEmail: this.email,
              playerId: this.id,
              characterSheetId: ""
            });
        })
        .then(() => {
          firebase
            .database()
            .ref("userParties/players/" + this.id + "/" + this.partyId)
            .update({
              playerEmail: this.email,
              playerId: this.id,
              characterSheetId: ""
            })
            .catch(error => {
              if (error) {
                console.log("Erro ao adicionar o jogador: " + error.message);
              }
            });
        })
        .catch(error => {
          console.log("Erro ao adicionar o jogador: " + error.message);
        });
    }
  }
};
</script>

<style></style>
