<template>
  <v-container>
    <v-img src="@/assets/avatar-placeholder.gif" height="230"></v-img>
    <v-tabs-items v-model="currentTab" class="mb-4">
      <v-tab-item>
        <Settings :party="party"></Settings>
      </v-tab-item>
      <v-tab-item>
        <PartySheets :party="party"></PartySheets>
      </v-tab-item>
    </v-tabs-items>
    <v-btn class="mx-1 mb-11" fab small fixed bottom right color="secondary">
      <v-icon>
        mdi-account-plus
      </v-icon>
    </v-btn>

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
import PartySheets from "@/components/PartyTabs/PartySheets";
import Settings from "@/components/PartyTabs/Settings";

export default {
  name: "Party",
  components: {
    PartySheets,
    Settings
  },
  props: {
    party: Object
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
h2 {
  color: #209898;
}

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
