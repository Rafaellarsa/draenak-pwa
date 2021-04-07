<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>Nova Mesa</v-card-title>
      <v-card-text>
        <v-text-field
          class="custom-placeholder"
          label="Nome da Mesa"
          v-model="name"
          required
        ></v-text-field>
        <v-text-field
          class="custom-placeholder pt-0"
          label="Tema"
          v-model="theme"
          required
        ></v-text-field>
        <v-text-field
          class="custom-placeholder pt-0"
          label="Pontos Iniciais"
          type="number"
          v-model="points"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn tile depressed @click="onClickCancelButton()">
          Cancelar
        </v-btn>
        <v-btn color="primary" tile depressed @click="onClickCreateButton()">
          Criar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase/app";
import "firebase/database";

export default {
  name: "NewPartyDialog",
  props: {
    isDialogVisible: Boolean
  },
  data() {
    return {
      name: "",
      theme: "",
      points: null,
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
    onClickCancelButton() {
      this.isVisible = false;
    },
    onClickCreateButton() {
      this.isVisible = false;
      let id = this.$store.state.user.user.id + performance.now();
      id = id.replace(".", "");

      const sheet = {
        id: id,
        name: this.name,
        party: "",
        race: "",
        height: "",
        age: "",
        points: this.points,
        money: "",
        attributes: [
          { name: "Físico", level: 5 },
          { name: "Coordenação", level: 5 },
          { name: "Inteligência", level: 5 },
          { name: "Astúcia", level: 5 },
          { name: "Vontade", level: 5 },
          { name: "Presença", level: 5 }
        ],
        skills: [],
        traits: [],
        inventory: [],
        injuries: [],
        history: "",
        notes: ""
      };

      firebase
        .database()
        .ref("characterSheets/" + this.$store.state.user.user.id + "/" + id)
        .set(sheet, error => {
          if (error) {
            console.log("Erro no cadastro da ficha: " + error.message);
          }
          this.$emit("update-sheets-list");
        });
    }
  }
};
</script>

<style></style>
