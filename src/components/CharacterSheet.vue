<template>
  <v-container>
    <v-tabs-items v-model="currentTab">
      <v-tab-item>
        <MainInfo :character="character"></MainInfo>
      </v-tab-item>
      <v-tab-item>
        <Inventory :character="character"></Inventory>
      </v-tab-item>
      <v-tab-item>
        <Injuries :character="character"></Injuries>
      </v-tab-item>
      <v-tab-item>
        <Notes :character="character"></Notes>
      </v-tab-item>
    </v-tabs-items>
    <v-footer padless app absolute>
      <v-tabs v-model="currentTab" grow background-color="#eeeeee">
        <v-tab>1</v-tab>
        <v-tab>2</v-tab>
        <v-tab>3</v-tab>
        <v-tab>4</v-tab>
      </v-tabs>
    </v-footer>
  </v-container>
</template>

<script>
import MainInfo from "@/components/SheetTabs/MainInfo";
import Inventory from "@/components/SheetTabs/Inventory";
import Injuries from "@/components/SheetTabs/Injuries";
import Notes from "@/components/SheetTabs/Notes";

export default {
  name: "CharacterSheet",
  components: {
    MainInfo,
    Inventory,
    Injuries,
    Notes
  },
  props: {
    character: Object
  },
  data() {
    return {
      currentTab: null
    };
  },
  methods: {}
};
</script>

<style>
h2 {
  color: #5915c7;
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
</style>
