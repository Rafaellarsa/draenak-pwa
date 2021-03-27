<template>
  <v-dialog v-model="isVisible" max-width="500">
    <v-card>
      <v-card-title> {{ title }} </v-card-title>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" tile depressed @click="onClickButton()">
          {{ buttonText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: String,
    message: String,
    buttonText: String,
    isDialogVisible: Boolean
  },
  data() {
    return {
      email: "",
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
    onClickButton() {
      this.isVisible = false;
    }
  }
};
</script>

<style></style>
