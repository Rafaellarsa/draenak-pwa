<template>
  <v-col>
    <input
      @change="onImageChange"
      type="file"
      id="image"
      style="display: none"
    />
    <v-btn
      v-if="isGeneralInfoEditable"
      absolute
      right
      class="mr-8 edit-photo-button"
      @click="onClickImageButton()"
      fab
      small
      color="primary"
    >
      <v-icon>
        mdi-camera
      </v-icon>
    </v-btn>
    <v-row no-gutters>
      <h2 v-if="!isGeneralInfoEditable">
        {{ modifiedSheet.name }}
      </h2>
      <v-text-field
        class="name-field"
        v-else
        v-model="generalInfo.name"
      ></v-text-field>

      <v-spacer></v-spacer>
      <v-icon
        v-if="!isGeneralInfoEditable"
        @click="isGeneralInfoEditable = true"
        >mdi-pencil</v-icon
      >
      <v-icon v-else @click="updateGeneralInfo()" color="primary"
        >mdi-check</v-icon
      >
    </v-row>
    <p v-if="!isGeneralInfoEditable">
      Raça: {{ modifiedSheet.race }}<br />
      Altura: {{ modifiedSheet.height }}<br />
      Idade: {{ modifiedSheet.age }}<br />
      Pontos: {{ modifiedSheet.points }}<br />
      Dinheiro: {{ modifiedSheet.money }}<br />
      <span v-if="modifiedSheet.party"
        >Mesa: {{ modifiedSheet.party.partyName }}</span
      >
      <span v-else>Mesa não escolhida</span>
    </p>
    <p v-else>
      <v-text-field
        dense
        hide-details
        prefix="Raça:"
        v-model="generalInfo.race"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Altura:"
        v-model="generalInfo.height"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Idade:"
        v-model="generalInfo.age"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Pontos:"
        v-model="generalInfo.points"
        type="number"
      ></v-text-field>
      <v-text-field
        dense
        hide-details
        prefix="Dinheiro:"
        v-model="generalInfo.money"
      ></v-text-field>
      <v-select
        prefix="Mesa: "
        no-data-text="Não há mesas disponíveis"
        :items="parties"
        item-text="partyName"
        item-value="partyId"
        v-model="generalInfo.party"
        return-object
        dense
      ></v-select>
      <v-btn
        color="red"
        block
        dark
        @click="isRemoveElementDialogVisible = true"
        depressed
        tile
        >Apagar ficha</v-btn
      >
    </p>
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
              >Atributos</v-expansion-panel-header
            >
            <v-icon
              v-if="!isAttributesEditable"
              @click="isAttributesEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="updateAttributes()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            v-if="!isAttributesEditable"
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div
              v-for="(attribute, index) in modifiedSheet.attributes"
              :key="index"
            >
              {{ attribute.name + ": " + attribute.level }}
              <v-progress-linear
                color="primary"
                :value="attribute.level * 5"
              ></v-progress-linear>
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content
            v-else
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(attribute, index) in attributes" :key="index">
              <v-text-field
                dense
                hide-details
                :prefix="attribute.name + ':'"
                v-model="attribute.level"
              ></v-text-field>
              <v-slider
                v-model="attribute.level"
                track-color="#c4c4c4"
                min="1"
                max="20"
              ></v-slider>
            </div>
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
              >Competências</v-expansion-panel-header
            >
            <v-icon v-if="!isSkillsEditable" @click="isSkillsEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="updateSkills()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            v-if="!isSkillsEditable"
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(skill, index) in modifiedSheet.skills" :key="index">
              {{ skill.name + ": " + skill.level }}
              <v-progress-linear
                color="primary"
                :value="skill.level * 5"
              ></v-progress-linear>
            </div>
            <div class="empty-string" v-if="!modifiedSheet.skills">
              {{ modifiedSheet.name + " ainda não tem competências" }}
              <v-btn icon color="#9a9a9a" @click="showEmptySkillsDialog()"
                ><v-icon>mdi-information-outline</v-icon></v-btn
              >
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content
            v-else
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(skill, index) in skills" :key="index">
              <div style="display: flex">
                <v-text-field
                  dense
                  hide-details
                  :prefix="skill.name + ':'"
                  v-model="skill.level"
                ></v-text-field>
                <v-btn class="mx-2 mb-1" fab x-small color="#DC2626">
                  <v-icon color="#eeeeee" @click="removeSkill(index)">
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
              <v-slider
                v-model="skill.level"
                track-color="#c4c4c4"
                min="0"
                max="20"
              ></v-slider>
            </div>
            <div class="add-button">
              <v-btn class="mx-2 mb-1" fab x-small color="primary">
                <v-icon @click="isNewSkillDialogVisible = true">
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
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
              >Traços</v-expansion-panel-header
            >
            <v-icon v-if="!isTraitsEditable" @click="isTraitsEditable = true"
              >mdi-pencil</v-icon
            >
            <v-icon v-else @click="updateTraits()" color="primary"
              >mdi-check</v-icon
            >
          </v-row>

          <v-expansion-panel-content
            v-if="!isTraitsEditable"
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(trait, index) in modifiedSheet.traits" :key="index">
              {{ trait.name }}
              <div class="description">
                {{ truncateDescription(trait.description) }}
              </div>
            </div>
            <div class="empty-string" v-if="!modifiedSheet.traits">
              {{ modifiedSheet.name + " ainda não tem traços" }}
              <v-btn icon color="#9a9a9a" @click="showEmptyTraitsDialog()"
                ><v-icon>mdi-information-outline</v-icon></v-btn
              >
            </div>
          </v-expansion-panel-content>
          <v-expansion-panel-content
            v-else
            color="#eeeeee"
            class="expansion-panel-content"
          >
            <div v-for="(trait, index) in traits" :key="index">
              <div style="display: flex">
                <v-text-field
                  dense
                  hide-details
                  label="Nome"
                  v-model="trait.name"
                ></v-text-field>
                <v-btn fab x-small color="#DC2626">
                  <v-icon color="#eeeeee" @click="removeTrait(index)">
                    mdi-close
                  </v-icon>
                </v-btn>
              </div>
              <div class="description">
                <v-textarea
                  v-model="trait.description"
                  label="Descrição"
                ></v-textarea>
              </div>
            </div>
            <div class="add-button">
              <v-btn class="mx-2 mb-1" fab x-small color="primary">
                <v-icon @click="isNewTraitDialogVisible = true">
                  mdi-plus
                </v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>

    <MessageDialog
      :is-dialog-visible="messageDialog.isVisible"
      :title="messageDialog.title"
      :message="messageDialog.message"
      buttonText="Okay"
      @close-dialog="messageDialog.isVisible = false"
    ></MessageDialog>

    <RemoveElementDialog
      :isDialogVisible="isRemoveElementDialogVisible"
      :isParty="false"
      :id="character.id"
      @close-dialog="isRemoveElementDialogVisible = false"
    ></RemoveElementDialog>

    <NewSkillDialog
      :isDialogVisible="isNewSkillDialogVisible"
      @create-new-skill="onCreateNewSkill"
      @close-dialog="isNewSkillDialogVisible = false"
    ></NewSkillDialog>

    <NewTraitDialog
      :isDialogVisible="isNewTraitDialogVisible"
      @create-new-trait="onCreateNewTrait"
      @close-dialog="isNewTraitDialogVisible = false"
    ></NewTraitDialog>
  </v-col>
</template>

<script>
import MessageDialog from "@/components/Dialogs/MessageDialog";
import RemoveElementDialog from "@/components/Dialogs/RemoveElementDialog";
import NewSkillDialog from "@/components/Dialogs/NewSkillDialog";
import NewTraitDialog from "@/components/Dialogs/NewTraitDialog";

export default {
  name: "MainInfo",
  components: {
    MessageDialog,
    RemoveElementDialog,
    NewSkillDialog,
    NewTraitDialog
  },
  props: {
    character: Object,
    parties: Array
  },
  data() {
    return {
      modifiedSheet: null,
      isGeneralInfoEditable: false,
      generalInfo: {
        name: "",
        race: "",
        height: "",
        age: "",
        points: "",
        money: "",
        party: ""
      },
      isAttributesEditable: false,
      attributes: [],
      isSkillsEditable: false,
      skills: [],
      isTraitsEditable: false,
      traits: [],
      isNewSkillDialogVisible: false,
      isNewTraitDialogVisible: false,
      messageDialog: {
        isVisible: false,
        title: "",
        message: ""
      },
      isRemoveElementDialogVisible: false,
      imageURL: ""
    };
  },
  created() {
    this.modifiedSheet = this.character;
    this.generalInfo = {
      name: this.character.name,
      race: this.character.race,
      height: this.character.height,
      age: this.character.age,
      points: this.character.points,
      money: this.character.money
    };
    this.attributes = this.character.attributes;
    if (this.character.skills) {
      this.skills = this.character.skills;
    }
    if (this.character.party) {
      this.generalInfo.party = this.character.party;
    }
  },
  methods: {
    updateGeneralInfo() {
      this.isGeneralInfoEditable = false;

      this.modifiedSheet.characterImageURL = this.imageURL;
      this.modifiedSheet.name = this.generalInfo.name;
      this.modifiedSheet.race = this.generalInfo.race;
      this.modifiedSheet.height = this.generalInfo.height;
      this.modifiedSheet.age = this.generalInfo.age;
      this.modifiedSheet.points = this.generalInfo.points;
      this.modifiedSheet.money = this.generalInfo.money;

      this.$emit("update-sheet", this.modifiedSheet);
    },
    updateAttributes() {
      this.isAttributesEditable = false;

      this.modifiedSheet.attributes = this.attributes;

      this.$emit("update-sheet", this.modifiedSheet);
    },
    updateSkills() {
      this.isSkillsEditable = false;

      this.modifiedSheet.skills = this.skills;

      this.$emit("update-sheet", this.modifiedSheet);
    },
    onCreateNewSkill(newSkill) {
      this.skills.push(newSkill);
    },
    removeSkill(index) {
      this.skills.splice(index, 1);
    },
    updateTraits() {
      this.isTraitsEditable = false;

      this.modifiedSheet.traits = this.traits;

      this.$emit("update-sheet", this.modifiedSheet);
    },
    onCreateNewTrait(newTrait) {
      this.traits.push(newTrait);
    },
    removeTrait(index) {
      this.traits.splice(index, 1);
    },
    showEmptyTraitsDialog() {
      this.messageDialog = {
        isVisible: true,
        title: "Traços",
        message: "Para adicionar ou editar traços, clique no botão de editar"
      };
    },
    showEmptySkillsDialog() {
      this.messageDialog = {
        isVisible: true,
        title: "Competências",
        message:
          "Para adicionar ou editar competências, clique no botão de editar"
      };
    },
    truncateDescription(description) {
      if (description.length > 36) {
        return description.slice(0, 36) + "...";
      } else {
        return description;
      }
    },
    onClickImageButton() {
      document.getElementById("image").click();
    },
    onImageChange(e) {
      const image = e.target.files[0];
      this.imageURL = URL.createObjectURL(image);
      this.$emit("on-image-change", image);
    }
  }
};
</script>

<style>
.theme--light.v-input.name-field input {
  color: #5915c7;
  font-size: 1.5rem;
  font-weight: bold;
}

.add-button {
  display: flex;
  justify-content: center;
}

.empty-string {
  color: #9a9a9a;
  font-style: italic;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
