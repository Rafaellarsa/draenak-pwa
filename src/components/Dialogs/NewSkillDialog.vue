<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>Nova Competência</v-card-title>
      <v-card-text>
        <v-text-field
          class="custom-placeholder"
          label="Nome da Competência"
          v-model="name"
          required
        ></v-text-field>
        <v-text-field
          class="custom-placeholder pt-0"
          label="Pontos Gastos por Nível"
          v-model="cost"
          type="number"
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
export default {
  name: "NewSheetDialog",
  props: {
    isDialogVisible: Boolean
  },
  data() {
    return {
      name: "",
      cost: null,
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

      const newSkill = {
        name: this.name,
        cost: this.cost,
        level: 0
      };

      this.$emit("create-new-skill", newSkill);
    }
  }
};
</script>

<style></style>
