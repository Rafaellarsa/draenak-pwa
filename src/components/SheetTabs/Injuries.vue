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
            <v-icon v-else @click="updateInjuries()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            v-if="!isInjuriesEditable"
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(injury, index) in modifiedSheet.injuries" :key="index">
              {{ injury.name + ": " + injury.level }}
              <v-progress-linear
                color="primary"
                :value="injury.level * 20"
              ></v-progress-linear>
            </div>
            <div class="empty-string" v-if="!modifiedSheet.injuries">
              {{ modifiedSheet.name + " não tem ferimentos" }}
              <v-btn icon color="#9a9a9a" @click="isMessageDialogVisible = true"
                ><v-icon>mdi-information-outline</v-icon></v-btn
              >
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content
            v-else
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(injury, index) in injuries" :key="index">
              <div style="display: flex">
                <v-text-field
                  dense
                  hide-details
                  :prefix="injury.name + ':'"
                  v-model="injury.level"
                ></v-text-field>
                <v-btn class="mx-2 mb-1" fab x-small color="#DC2626">
                  <v-icon color="#eeeeee" @click="removeInjury(index)">
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
              <v-slider
                v-model="injury.level"
                track-color="#c4c4c4"
                min="0"
                max="5"
              ></v-slider>
            </div>
            <div class="add-button">
              <v-btn class="mx-2 mb-1" fab x-small color="primary">
                <v-icon @click="isNewInjuryDialogVisible = true">
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <MessageDialog
      :is-dialog-visible="isMessageDialogVisible"
      title="Ferimentos"
      message="Para adicionar ou editar ferimentos, clique no botão de editar"
      buttonText="Okay"
      @close-dialog="isMessageDialogVisible = false"
    ></MessageDialog>

    <NewInjuryDialog
      :isDialogVisible="isNewInjuryDialogVisible"
      @create-new-injury="onCreateNewInjury"
      @close-dialog="isNewInjuryDialogVisible = false"
    ></NewInjuryDialog>
  </v-col>
</template>

<script>
import MessageDialog from "@/components/Dialogs/MessageDialog";
import NewInjuryDialog from "@/components/Dialogs/NewInjuryDialog";

export default {
  name: "Injuries",
  components: {
    MessageDialog,
    NewInjuryDialog
  },
  props: {
    character: Object
  },
  data() {
    return {
      modifiedSheet: null,
      isInjuriesEditable: false,
      injuries: [],
      isNewInjuryDialogVisible: false,
      isMessageDialogVisible: false
    };
  },
  created() {
    this.modifiedSheet = this.character;
    if (this.character.injuries) {
      this.injuries = this.character.injuries;
    }
  },
  methods: {
    updateInjuries() {
      this.isInjuriesEditable = false;

      this.modifiedSheet.injuries = this.injuries;

      this.$emit("update-sheet", this.modifiedSheet);
    },
    onCreateNewInjury(newInjury) {
      this.injuries.push(newInjury);
    },
    removeInjury(index) {
      this.injuries.splice(index, 1);
    }
  }
};
</script>

<style></style>
