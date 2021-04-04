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
              >Ferimentos</v-expansion-panel-header
            >
            <v-icon
              v-if="!isInjuriesEditable"
              @click="isInjuriesEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="isInjuriesEditable = false" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            Braço esquerdo: 3
            <v-progress-linear color="primary" value="60"></v-progress-linear>
            Ombro direito: 1
            <v-progress-linear color="primary" value="20"></v-progress-linear>
            Mão esquerda: 5
            <v-progress-linear color="primary" value="100"></v-progress-linear>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Injuries",
  props: {
    character: Object
  },
  data() {
    return {
      isInjuriesEditable: false
    };
  }
};
</script>

<style></style>
