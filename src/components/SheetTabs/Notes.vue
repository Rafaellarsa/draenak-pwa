<template>
  <v-col>
    <v-row no-gutters>
      <h2>
        {{ character.name }}
      </h2>
    </v-row>

    <v-row justify="center" no-gutters>
      <v-expansion-panels flat>
        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>

          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >História</v-expansion-panel-header
            >
            <v-icon v-if="!isHistoryEditable" @click="isHistoryEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="updateHistory()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-if="!isHistoryEditable">
              {{ this.modifiedSheet.history }}
            </div>
            <v-textarea v-else auto-grow v-model="history"></v-textarea>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel class="ma-1 expansion-panel">
          <v-divider></v-divider>

          <v-row justify="space-between" no-gutters>
            <v-expansion-panel-header
              color="#eeeeee"
              expand-icon="mdi-menu-down"
              class="px-0"
              style="max-width: 90%"
              >Anotações</v-expansion-panel-header
            >
            <v-icon v-if="!isNotesEditable" @click="isNotesEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="updateNotes()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-if="!isNotesEditable">
              {{ this.modifiedSheet.notes }}
            </div>
            <v-textarea v-else auto-grow v-model="notes"></v-textarea>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Notes",
  props: {
    character: Object
  },
  data() {
    return {
      modifiedSheet: null,
      isHistoryEditable: false,
      history: "",
      isNotesEditable: false,
      notes: ""
    };
  },
  created() {
    this.modifiedSheet = this.character;
    this.history = this.character.history;
    this.notes = this.character.notes;
  },
  methods: {
    updateHistory() {
      this.isHistoryEditable = false;
      this.modifiedSheet.history = this.history;
      this.$emit("update-sheet", this.modifiedSheet);
    },
    updateNotes() {
      this.isNotesEditable = false;
      this.modifiedSheet.notes = this.notes;
      this.$emit("update-sheet", this.modifiedSheet);
    }
  }
};
</script>

<style></style>
