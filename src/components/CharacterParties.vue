<template>
  <v-container>
    <v-img src="@/assets/avatar-placeholder.gif" height="230"></v-img>
    <v-tabs-items v-model="currentTab" class="mb-4">
      <v-tab-item>
        <Setting :character="characterParties"></Setting>
      </v-tab-item>
      <v-tab-item>
        <PartiesSheets :character="characterParties"></PartiesSheets>
      </v-tab-item>
    </v-tabs-items>
    <v-btn class="mx-1 mb-11" fab small fixed bottom right color="secondary">
      <v-icon>
        mdi-account-plus
      </v-icon>
    </v-btn>

    <!--Footer-->
    <v-footer padless app fixed>
      <v-tabs
        v-model="currentTab"
        grow
        background-color="#eeeeee"
        color="secondary"
      >
        <v-tab>
          <img
            src="@/assets/ancient-scroll.svg"
            alt="Pergaminho"
            width="33"
            height="33"
          />
        </v-tab>
        <v-tab>
          <img src="@/assets/group.svg" alt="Pessoas" width="33" height="33" />
        </v-tab>
      </v-tabs>
    </v-footer>
  </v-container>
</template>
<script>
import PartiesSheets from "@/components/PartiesTabs/PartiesSheets";
import Setting from "@/components/PartiesTabs/Setting";

export default {
  name: "CharacterParties",
  components: {
    PartiesSheets,
    Setting
  },
  props: {
    character: Object
  },
  data() {
    return {
      currentTab: null,
      characterParties: null
    };
  },
  mounted() {
    this.characterParties = this.character;
  }
};
</script>

<style scoped>
.v-image {
  margin-top: -16px !important;
  margin-left: -12px !important;
  margin-right: -12px !important;
}

.v-responsive {
  max-width: 100vw !important;
}
</style>
<style>
h2 {
  color: #209898;
}

p {
  line-height: 18.75px;
}

.expansion-panel {
  border-radius: 0;
  background-color: #eeeeee !important;
}

.expansion-panel-content {
  margin-left: -24px;
  margin-right: -24px;
}

.v-tabs-items {
  background-color: #eeeeee !important;
}

.v-slider {
  margin: 0 !important;
}
</style>
