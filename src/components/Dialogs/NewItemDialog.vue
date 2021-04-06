<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title>Novo Item</v-card-title>
      <v-card-text>
        <v-text-field
          class="custom-placeholder"
          label="Quantidade do Item"
          v-model="quantity"
          type="number"
          required
        ></v-text-field>
        <v-text-field
          class="custom-placeholder"
          label="Nome do Item"
          v-model="name"
          required
        ></v-text-field>
        <v-textarea
          class="custom-placeholder"
          label="Descrição do Item"
          v-model="description"
          required
        >
        </v-textarea>
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
  name: "NewItemDialog",
  props: {
    isDialogVisible: Boolean
  },
  data() {
    return {
      quantity: "",
      name: "",
      description: "",
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

      const newItem = {
        quantity: this.quantity,
        name: this.name,
        description: this.description
      };

      this.$emit("create-new-item", newItem);
    }
  }
};
</script>

<style></style>
