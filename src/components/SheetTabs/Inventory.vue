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
              >Inventário</v-expansion-panel-header
            >
            <v-icon
              v-if="!isInventoryEditable"
              @click="isInventoryEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="isInventoryEditable = false" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            color="#eeeeee"
            class="expansion-panel-content"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "Inventory",
  props: {
    character: Object
  },
  data() {
    return {
      isInventoryEditable: false
    };
  }
};
</script>

<style></style>
