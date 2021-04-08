<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>Nova Personagem</v-card-title>
      <v-card-text>
        <v-text-field
          class="custom-placeholder"
          label="Nome da Personagem"
          v-model="name"
          required
        ></v-text-field>
        <v-text-field
          class="custom-placeholder pt-0"
          label="Pontos Iniciais"
          type="number"
          v-model="points"
          required
        ></v-text-field>
        <v-select
          label="Mesa"
          no-data-text="Não há mesas disponíveis"
          :items="parties"
          item-text="partyName"
          item-value="partyId"
          v-model="party"
          return-object
          dense
        ></v-select>
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
  name: "NewSheetDialog",
  props: {
    isDialogVisible: Boolean,
    parties: Array
  },
  data() {
    return {
      name: "",
      points: null,
      isVisible: false,
      party: null
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
        party: this.party,
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

      this.addSheetToParty(id, this.party.partyId);
    },
    addSheetToParty(cardId, partyId) {
      // Atualiza o jogador na mesa
      firebase
        .database()
        .ref(
          "parties/" + partyId + "/players/" + this.$store.state.user.user.id
        )
        .update({ characterSheetId: cardId })
        .then(() => {
          // Insere o jogador no relacionamento mesa x jogador
          firebase
            .database()
            .ref(
              "userParties/players/" +
                this.$store.state.user.user.id +
                "/" +
                partyId
            )
            .update({ characterSheetId: cardId })
            .catch(error => {
              console.log("Erro ao adicionar o jogador: " + error.message);
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
