<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>Remover {{ title }}</v-card-title>
      <v-card-text> Deseja apagar {{ text }}? </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile depressed @click="$emit('close-dialog')">Cancelar</v-btn>
        <v-btn color="red" dark tile depressed @click="onClickConfirmButton()"
          >Confirmar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

export default {
  name: "RemoveElementDialog",
  props: {
    isDialogVisible: Boolean,
    isParty: Boolean,
    id: String
  },
  data() {
    return {
      isVisible: false
    };
  },
  computed: {
    title() {
      return this.isParty ? "Mesa" : "Ficha";
    },
    text() {
      return this.isParty ? "a mesa" : "a ficha";
    }
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
    onClickConfirmButton() {
      this.isVisible = false;
      if (this.isParty) {
        this.removeParty();
      } else {
        this.removeSheet();
      }
    },
    removeSheet() {
      firebase
        .database()
        .ref(
          "characterSheets/" + this.$store.state.user.user.id + "/" + this.id
        )
        .remove()
        .catch(error => {
          console.log("Erro ao remover ficha: " + error.message);
        });
    },

    removeParty() {
      firebase
        .database()
        .ref("parties/" + this.id)
        .remove()
        .catch(error => {
          console.log("Erro ao apagar mesa: " + error.message);
        });

      firebase
        .storage()
        .ref("party_images/" + "/" + this.id + "/")
        .listAll()
        .then(data => {
          data.items.forEach(item => {
            item.delete();
          });
        });
    }
  }
};
</script>

<style></style>
