<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>Novo Ferimento</v-card-title>
      <v-card-text>
        <v-text-field
          class="custom-placeholder"
          label="Nome do Ferimento"
          v-model="name"
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
  name: "NewInjuryDialog",
  props: {
    isDialogVisible: Boolean
  },
  data() {
    return {
      name: "",
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

      const newInjury = {
        name: this.name,
        level: 0
      };

      this.$emit("create-new-injury", newInjury);
    }
  }
};
</script>

<style></style>
